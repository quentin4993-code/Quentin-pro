// Miniatures « Le D+ expliqué simplement » — version travaillée : silhouette détourée sur fond graphique.
import { AbsoluteFill, Img, staticFile } from "remotion";
import { NEUTRE } from "./neutre";

const BEIGE_1 = "#F6F0E6";
const BEIGE_2 = "#E8DCCB";

// courbes de niveau (style carte de rando) : lignes ondulées concentriques
const Contours: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
    {Array.from({ length: 14 }).map((_, i) => {
      const r = 120 + i * 85;
      const cx = 820;
      const cy = 420;
      const pts = Array.from({ length: 73 }).map((__, k) => {
        const a = (k / 72) * Math.PI * 2;
        const wob = 1 + 0.08 * Math.sin(a * 3 + i) + 0.05 * Math.cos(a * 5 - i * 0.7);
        return `${cx + Math.cos(a) * r * wob * 1.15},${cy + Math.sin(a) * r * wob * 0.85}`;
      });
      return <polygon key={i} points={pts.join(" ")} fill="none" stroke={NEUTRE.brown} strokeOpacity={0.09} strokeWidth={3} />;
    })}
  </svg>
);

// profil de montagne (montées bleues, descentes marron)
const P: [number, number][] = [[0, 0], [1.6, 100], [2.4, 50], [4.4, 250], [5.4, 150], [7.2, 350], [10, 20]];
const Profile: React.FC<{ top: number }> = ({ top }) => {
  const X = (k: number) => -20 + k * 112;
  const Y = (a: number) => top - a * 1.1;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <polygon points={[...P.map(([k, a]) => `${X(k)},${Y(a)}`), `${X(10)},1920`, `${X(0)},1920`].join(" ")} fill={NEUTRE.brown} fillOpacity={0.07} />
      {P.slice(0, -1).map(([k, a], i) => (
        <line key={i} x1={X(k)} y1={Y(a)} x2={X(P[i + 1][0])} y2={Y(P[i + 1][1])} stroke={P[i + 1][1] > a ? NEUTRE.blue : NEUTRE.brown} strokeOpacity={0.55} strokeWidth={14} strokeLinecap="round" />
      ))}
    </svg>
  );
};

export type CoverProProps = { cut: string; keyword: string; kwSize?: number; title: string; titleSize?: number; sub: string; imgTop?: number; kwTop?: number; titleTop?: number };
export const CoverJ6Pro: React.FC<{ variant: "doigts" | "question" }> = ({ variant }) =>
  variant === "doigts" ? (
    <CoverPro cut="covers/jour6-cut-doigts.png" keyword="D+" title="10 km ≠ 10 km" titleSize={128} sub="Le D+ expliqué simplement" />
  ) : (
    <CoverPro cut="covers/jour6-cut-calme.png" keyword="D+" title={"C'est quoi le D+\u00a0?"} titleSize={112} sub="Expliqué simplement pour débuter" />
  );

export const CoverPro: React.FC<CoverProProps> = ({ cut, keyword, kwSize = 560, title, titleSize = 120, sub, imgTop = 230, kwTop = 170, titleTop = 1300 }) => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${BEIGE_1} 0%, ${BEIGE_2} 100%)`, overflow: "hidden" }}>
      <Contours />
      <Profile top={1000} />
      {/* énorme D+ derrière la silhouette */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: kwTop,
          textAlign: "center",
          fontFamily: NEUTRE.font,
          fontWeight: 800,
          fontSize: kwSize,
          letterSpacing: -20,
          lineHeight: 1,
          color: NEUTRE.blue,
        }}
      >
        {keyword}
      </div>
      {/* silhouette détourée */}
      <Img
        src={staticFile(cut)}
        style={{
          position: "absolute",
          left: 0,
          top: imgTop,
          width: 1080,
          height: 1920,
          objectFit: "cover",
          filter: "drop-shadow(0 18px 30px rgba(60,40,20,0.35))",
        }}
      />
      {/* fondu bas : efface les restes du décor et pose le titre */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1560, bottom: 0, background: `linear-gradient(180deg, rgba(232,220,203,0) 0%, ${BEIGE_2} 55%)` }} />
      <div style={{ position: "absolute", left: 0, top: 1450, width: 140, bottom: 0, background: `linear-gradient(90deg, ${BEIGE_2} 20%, rgba(232,220,203,0) 100%)` }} />
      {/* titre */}
      <div style={{ position: "absolute", left: 0, right: 0, top: titleTop, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div
          style={{
            fontFamily: NEUTRE.font,
            fontWeight: 800,
            fontSize: titleSize,
            color: "white",
            backgroundColor: NEUTRE.brown,
            padding: "14px 44px",
            borderRadius: 30,
            boxShadow: "0 16px 40px rgba(40,25,10,0.35)",
            transform: "rotate(-2deg)",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: NEUTRE.font,
            fontWeight: 700,
            fontSize: 46,
            color: NEUTRE.brown,
            backgroundColor: "white",
            padding: "12px 34px",
            borderRadius: 999,
            boxShadow: "0 10px 26px rgba(40,25,10,0.18)",
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};
