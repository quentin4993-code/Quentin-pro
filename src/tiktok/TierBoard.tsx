import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, fontFamily } from "./style";
import { ICONS } from "./icons";

/**
 * Tableau de classement en 3 colonnes, en haut de l'écran (sous les onglets TikTok).
 * - À l'annonce d'un objet (`annFrame`), une carte avec son icône entre par la droite, à côté du visage.
 * - Au verdict (`frame`), la carte vole jusqu'à sa colonne et s'y pose (FLY images), avec un flash.
 * col = 0 (INDISPENSABLE), 1 (UTILE), 2 (PAS INDISPENSABLE),
 * ou 0.5 / 1.5 pour « entre les deux » (l'étiquette chevauche les deux colonnes, en pointillés).
 */
export type TierItem = { label: string; col: number; frame: number; annFrame?: number };

export const FLY = 10; // durée du vol carte → tableau (images) ; le « pop » sonne à l'atterrissage

const COLS = [
  { title: "INDISPENSABLE", bg: ACCENT, fg: "black" },
  { title: "UTILE", bg: "white", fg: "black" },
  { title: "PAS INDISPENSABLE", bg: "rgba(0,0,0,0.85)", fg: "white" },
];
const W = 990;
const LEFT = (1080 - W) / 2;
const TOP = 205;
const COL_W = W / 3;
const HEAD_H = 56;
const ROW_H = 54;
const CARD = { x: 905, y: 760, w: 250, h: 250 }; // centre de la carte, à droite du visage

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Icon: React.FC<{ name: string; size: number; color: string }> = ({ name, size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flexShrink: 0 }}>
    <path d={ICONS[name] ?? ""} fill={color} />
  </svg>
);

export const TierBoard: React.FC<{ items: TierItem[]; startFrame: number }> = ({ items, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startFrame) return null;
  const enter = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });

  // ligne de chaque objet dans sa colonne (ordre d'apparition) ; « entre deux » sur une ligne du bas
  const counts = new Map<number, number>();
  const placed = items.map((it) => {
    const between = !Number.isInteger(it.col);
    const row = between ? -1 : counts.get(it.col) ?? 0;
    if (!between) counts.set(it.col, row + 1);
    return { ...it, row, between };
  });
  const maxRows = Math.max(...Array.from(counts.values()), 0);
  placed.forEach((p) => {
    if (p.row === -1) p.row = maxRows;
  });
  const rows = maxRows + (placed.some((p) => p.between) ? 1 : 0);
  const H = HEAD_H + rows * ROW_H + 14;

  const chipCenter = (p: (typeof placed)[number]) => ({
    x: LEFT + (p.col + 0.5) * COL_W,
    y: TOP + HEAD_H + p.row * ROW_H + ROW_H / 2,
  });

  return (
    <AbsoluteFill>
      {/* tableau */}
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: TOP,
          width: W,
          height: H,
          borderRadius: 22,
          backgroundColor: "rgba(0,0,0,0.4)",
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [-40, 0])}px)`,
        }}
      >
        {[1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * COL_W, top: 10, bottom: 10, width: 2, backgroundColor: "rgba(255,255,255,0.35)" }} />
        ))}
        {COLS.map((c, i) => (
          <div
            key={c.title}
            style={{
              position: "absolute",
              left: i * COL_W + 10,
              top: 8,
              width: COL_W - 20,
              height: HEAD_H - 12,
              borderRadius: 10,
              backgroundColor: c.bg,
              color: c.fg,
              fontFamily,
              fontWeight: 900,
              fontSize: i === 2 ? 25 : 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {c.title}
          </div>
        ))}
      </div>

      {/* étiquettes posées dans le tableau */}
      {placed.map((p) => {
        const land = p.frame + FLY;
        if (frame < land) return null;
        const c = chipCenter(p);
        const bounce = spring({ frame: frame - land, fps, config: { damping: 9, stiffness: 260 } });
        const flash = interpolate(frame - land, [0, 14], [1, 0], clamp);
        return (
          <div
            key={`chip-${p.label}`}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y,
              transform: `translate(-50%, -50%) scale(${interpolate(bounce, [0, 1], [1.35, 1])})`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px 5px 10px",
              borderRadius: 10,
              whiteSpace: "nowrap",
              fontFamily,
              fontWeight: 800,
              fontSize: 26,
              color: flash > 0.5 ? "black" : "white",
              backgroundColor: `rgba(${Math.round(255 * flash)}, ${Math.round(214 * flash)}, ${Math.round(10 * flash)}, ${0.55 + 0.45 * flash})`,
              border: p.between ? "2px dashed rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.25)",
            }}
          >
            <Icon name={p.label} size={28} color={flash > 0.5 ? "black" : "white"} />
            {p.label}
          </div>
        );
      })}

      {/* carte de l'objet annoncé, puis vol vers le tableau */}
      {placed.map((p) => {
        const ann = p.annFrame ?? p.frame - 15;
        if (frame < ann || frame >= p.frame + FLY) return null;
        const inS = spring({ frame: frame - ann, fps, config: { damping: 14, stiffness: 170 } });
        const fly = interpolate(frame, [p.frame, p.frame + FLY], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        const target = chipCenter(p);
        const x = interpolate(fly, [0, 1], [CARD.x + interpolate(inS, [0, 1], [320, 0]), target.x]);
        const y = interpolate(fly, [0, 1], [CARD.y, target.y]);
        const scale = interpolate(fly, [0, 1], [1, 0.22]);
        const rot = interpolate(inS, [0, 1], [12, 3]) * (1 - fly);
        return (
          <div
            key={`card-${p.label}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: CARD.w,
              height: CARD.h,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`,
              backgroundColor: "white",
              borderRadius: 30,
              boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
              border: `6px solid ${ACCENT}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: interpolate(fly, [0.85, 1], [1, 0], clamp),
            }}
          >
            <Icon name={p.label} size={120} color="black" />
            <div style={{ fontFamily, fontWeight: 900, fontSize: p.label.length > 11 ? 24 : 28, color: "black", textAlign: "center", padding: "0 10px" }}>
              {p.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
