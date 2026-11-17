// Couvertures « Le D+ expliqué simplement » (vidéo Communauté) — DA sobre.
import { AbsoluteFill, Img, staticFile } from "remotion";
import { NEUTRE } from "./neutre";

const pill: React.CSSProperties = { fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 42, color: NEUTRE.brown, backgroundColor: NEUTRE.beigeT, padding: "10px 30px", borderRadius: 999 };
const big: React.CSSProperties = { fontFamily: NEUTRE.font, fontWeight: 800, color: "white", textShadow: "0 4px 24px rgba(0,0,0,0.5)" };

const P: [number, number][] = [[0, 0], [1.6, 100], [2.4, 50], [4.4, 250], [5.4, 150], [7.2, 350], [10, 0]];
const X = (k: number) => 40 + k * 70;
const Y = (a: number) => 230 - a * 0.6;

export const CoverJ6: React.FC<{ variant: "hook" | "question" }> = ({ variant }) => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <Img src={staticFile(variant === "hook" ? "covers/jour6-hook.jpg" : "covers/jour6-face.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 50%)" }} />
    {variant === "hook" ? (
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380, gap: 26 }}>
        <div style={{ ...big, fontSize: 150 }}>10 km ≠ 10 km</div>
        <div style={pill}>Le D+ expliqué simplement</div>
      </AbsoluteFill>
    ) : (
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300, gap: 24 }}>
        <div style={{ ...big, fontSize: 116 }}>C'est quoi le D+&nbsp;?</div>
        <div style={{ width: 860, height: 300, borderRadius: 32, backgroundColor: NEUTRE.beigeT, position: "relative" }}>
          <div style={{ position: "absolute", left: 40, top: 26, fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 52, color: NEUTRE.blue }}>D+ 500 m</div>
          <svg width={860} height={300} viewBox="0 0 860 300" style={{ position: "absolute", left: 40, top: 30 }}>
            {P.slice(0, -1).map(([k, a], i) => (
              <line key={i} x1={X(k)} y1={Y(a)} x2={X(P[i + 1][0])} y2={Y(P[i + 1][1])} stroke={P[i + 1][1] > a ? NEUTRE.blue : NEUTRE.brown} strokeWidth={12} strokeLinecap="round" />
            ))}
          </svg>
        </div>
        <div style={pill}>Expliqué simplement pour débuter le trail</div>
      </AbsoluteFill>
    )}
  </AbsoluteFill>
);
