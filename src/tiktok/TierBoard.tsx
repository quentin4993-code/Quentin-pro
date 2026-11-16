import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, fontFamily } from "./style";

/**
 * Tableau de classement en 3 colonnes, en haut de l'écran (sous les onglets TikTok).
 * Chaque objet apparaît dans sa colonne au moment du verdict.
 * col = 0 (INDISPENSABLE), 1 (UTILE), 2 (PAS INDISPENSABLE),
 * ou 0.5 / 1.5 pour « entre les deux » (l'étiquette chevauche les deux colonnes).
 */
export type TierItem = { label: string; col: number; frame: number };

const COLS = [
  { title: "INDISPENSABLE", bg: ACCENT, fg: "black" },
  { title: "UTILE", bg: "white", fg: "black" },
  { title: "PAS INDISPENSABLE", bg: "rgba(0,0,0,0.85)", fg: "white" },
];
const W = 990; // largeur totale
const COL_W = W / 3;
const HEAD_H = 56;
const ROW_H = 52;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const TierBoard: React.FC<{ items: TierItem[]; startFrame: number; hideFrom: number }> = ({ items, startFrame, hideFrom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
  const exit = interpolate(frame, [hideFrom, hideFrom + 8], [1, 0], clamp);
  if (frame < startFrame) return null;

  // rang (ligne) de chaque objet dans sa colonne, dans l'ordre d'apparition
  const counts = new Map<number, number>();
  const placed = items.map((it) => {
    const key = Number.isInteger(it.col) ? it.col : -1; // « entre deux » : ligne du bas
    const row = key === -1 ? -1 : counts.get(key) ?? 0;
    if (key !== -1) counts.set(key, row + 1);
    return { ...it, row };
  });
  const maxRows = Math.max(...Array.from(counts.values()), 0);
  placed.forEach((p) => {
    if (p.row === -1) p.row = maxRows; // sous les colonnes, à cheval
  });
  const rows = maxRows + (placed.some((p) => !Number.isInteger(p.col)) ? 1 : 0);
  const H = HEAD_H + rows * ROW_H + 16;

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 205, opacity: enter * exit }}>
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          borderRadius: 22,
          backgroundColor: "rgba(0,0,0,0.38)",
          transform: `translateY(${interpolate(enter, [0, 1], [-40, 0])}px)`,
        }}
      >
        {/* séparateurs de colonnes */}
        {[1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: i * COL_W, top: 10, bottom: 10, width: 2, backgroundColor: "rgba(255,255,255,0.35)" }} />
        ))}
        {/* titres */}
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
              letterSpacing: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {c.title}
          </div>
        ))}
        {/* objets */}
        {placed.map((p) => {
          if (frame < p.frame) return null;
          const pop = spring({ frame: frame - p.frame, fps, config: { damping: 13, stiffness: 200 } });
          const isNew = frame - p.frame < 24;
          const between = !Number.isInteger(p.col);
          const cx = (p.col + 0.5) * COL_W; // centre horizontal (0.5 → frontière 0/1)
          return (
            <div
              key={p.label}
              style={{
                position: "absolute",
                left: cx,
                top: HEAD_H + p.row * ROW_H + 4,
                transform: `translateX(-50%) translateY(${interpolate(pop, [0, 1], [-18, 0])}px)`,
                opacity: pop,
                padding: "5px 16px",
                borderRadius: 10,
                whiteSpace: "nowrap",
                fontFamily,
                fontWeight: 800,
                fontSize: 28,
                color: "white",
                backgroundColor: isNew ? "rgba(255,214,10,0.28)" : "rgba(0,0,0,0.55)",
                border: between ? "2px dashed rgba(255,255,255,0.85)" : "2px solid rgba(255,255,255,0.25)",
              }}
            >
              {p.label}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
