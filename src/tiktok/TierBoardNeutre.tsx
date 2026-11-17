// Tableau de classement — DA « neutre » : panneau beige clair, texte marron, casse normale,
// carte d'objet sobre, animations douces (glissement + fondu, pas de rebond ni de rotation).
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ICONS } from "./icons";
import { NEUTRE } from "./neutre";
import { FLY, TierItem } from "./TierBoard";

const COLS = ["Indispensable", "Utile", "Pas indispensable"];
const W = 980;
const LEFT = (1080 - W) / 2;
const TOP = 215;
const COL_W = W / 3;
const HEAD_H = 58;
const ROW_H = 52;
const CARD = { x: 900, y: 770, w: 240, h: 240 };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// libellés en casse normale
const NICE: Record<string, string> = {
  GILET: "Gilet",
  FLASQUES: "Flasques",
  FRONTALE: "Frontale",
  VESTE: "Veste",
  "GELS / BARRES": "Gels / barres",
  BÂTONS: "Bâtons",
  LUNETTES: "Lunettes",
  "CASQUETTE/BUFF": "Casquette / buff",
  CRÈME: "Crème",
  SIFFLET: "Sifflet",
  "MONTRE GPS": "Montre GPS",
  ÉCOUTEURS: "Écouteurs",
};
const nice = (l: string) => NICE[l] ?? l;

const Icon: React.FC<{ name: string; size: number; color: string }> = ({ name, size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flexShrink: 0 }}>
    <path d={ICONS[name] ?? ""} fill={color} />
  </svg>
);

export const TierBoardNeutre: React.FC<{ items: TierItem[]; startFrame: number }> = ({ items, startFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;
  const enter = interpolate(frame - startFrame, [0, 10], [0, 1], clamp);

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
      <div
        style={{
          position: "absolute",
          left: LEFT,
          top: TOP,
          width: W,
          height: H,
          borderRadius: 26,
          backgroundColor: NEUTRE.beigeT,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [-16, 0])}px)`,
        }}
      >
        {[1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * COL_W, top: 16, bottom: 16, width: 1.5, backgroundColor: NEUTRE.brownSoft, opacity: 0.35 }} />
        ))}
        {COLS.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: i * COL_W,
              top: 14,
              width: COL_W,
              textAlign: "center",
              fontFamily: NEUTRE.font,
              fontWeight: 700,
              fontSize: 27,
              color: NEUTRE.brown,
            }}
          >
            {t}
            <div style={{ margin: "8px auto 0", width: 46, height: 3, borderRadius: 2, backgroundColor: i === 0 ? NEUTRE.blue : NEUTRE.brownSoft, opacity: i === 0 ? 0.9 : 0.4 }} />
          </div>
        ))}
      </div>

      {/* objets rangés */}
      {placed.map((p) => {
        const land = p.frame + FLY;
        if (frame < land) return null;
        const c = chipCenter(p);
        const fresh = interpolate(frame - land, [0, 20], [1, 0], clamp);
        const a = interpolate(frame - land, [0, 5], [0, 1], clamp);
        return (
          <div
            key={`chip-${p.label}`}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y,
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "4px 14px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              fontFamily: NEUTRE.font,
              fontWeight: 600,
              fontSize: 27,
              color: NEUTRE.brown,
              opacity: a,
              backgroundColor: `rgba(62, 106, 158, ${0.18 * fresh})`,
              border: p.between ? `1.5px dashed ${NEUTRE.brownSoft}` : "1.5px solid transparent",
            }}
          >
            <Icon name={p.label} size={26} color={NEUTRE.brown} />
            {nice(p.label)}
          </div>
        );
      })}

      {/* carte de l'objet annoncé, puis glissement vers le tableau */}
      {placed.map((p) => {
        const ann = p.annFrame ?? p.frame - 15;
        if (frame < ann || frame >= p.frame + FLY) return null;
        const inA = interpolate(frame - ann, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        const fly = interpolate(frame, [p.frame, p.frame + FLY], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        const t = chipCenter(p);
        const x = interpolate(fly, [0, 1], [CARD.x + interpolate(inA, [0, 1], [40, 0]), t.x]);
        const y = interpolate(fly, [0, 1], [CARD.y, t.y]);
        const scale = interpolate(fly, [0, 1], [1, 0.25]);
        return (
          <div
            key={`card-${p.label}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: CARD.w,
              height: CARD.h,
              transform: `translate(-50%, -50%) scale(${scale})`,
              backgroundColor: NEUTRE.beige,
              borderRadius: 28,
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              opacity: inA * interpolate(fly, [0.8, 1], [1, 0], clamp),
            }}
          >
            <Icon name={p.label} size={110} color={NEUTRE.brown} />
            <div style={{ fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 30, color: NEUTRE.brown, textAlign: "center", padding: "0 12px" }}>
              {nice(p.label)}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
