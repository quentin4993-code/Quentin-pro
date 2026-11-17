// Couvertures « Jour 5 » — DA sobre (Inter, blanc / beige / marron).
import { AbsoluteFill, Img, staticFile } from "remotion";
import { NEUTRE } from "./neutre";

const shadow = "0 0 3px rgba(0,0,0,0.6), 0 3px 18px rgba(0,0,0,0.45)";
const pill: React.CSSProperties = {
  fontFamily: NEUTRE.font,
  fontWeight: 600,
  fontSize: 40,
  color: NEUTRE.brown,
  backgroundColor: NEUTRE.beigeT,
  padding: "10px 28px",
  borderRadius: 999,
};

export const CoverJ5: React.FC<{ variant: "renfo" | "saut" }> = ({ variant }) => {
  const bg = variant === "renfo" ? "covers/jour5-renfo.jpg" : "covers/jour5-saut.jpg";
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Img src={staticFile(bg)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {variant === "renfo" ? (
        <>
          <AbsoluteFill style={{ alignItems: "center", paddingTop: 270 }}>
            <div style={pill}>Jour 5/22 · prépa 1er trail</div>
          </AbsoluteFill>
          <AbsoluteFill style={{ alignItems: "center", paddingTop: 420 }}>
            <div style={{ fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 160, letterSpacing: 10, color: "white", textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}>RENFO</div>
          </AbsoluteFill>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 330, background: "linear-gradient(0deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 35%)" }}>
            <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 62, lineHeight: 1.15, color: "white", textShadow: shadow, textAlign: "center", maxWidth: 900 }}>
              Pas un seul kilomètre…
              <br />
              et pourtant, ça pique.
            </div>
          </AbsoluteFill>
        </>
      ) : (
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300, gap: 18, background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 45%)" }}>
          <div style={pill}>Jour 5/22 · prépa 1er trail</div>
          <div style={{ fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 110, color: "white", textShadow: shadow }}>Séance renfo</div>
          <div style={{ fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 46, color: "white", textShadow: shadow }}>Circuit training · 5 tours</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
