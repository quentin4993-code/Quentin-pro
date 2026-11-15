import { AbsoluteFill, Img, staticFile } from "remotion";
import { ACCENT, fontFamily } from "./style";

export type CoverProps = {
  bg: string; // image de fond dans public/
  day: string; // ex. "JOUR 3 / 22"
  highlight: string; // ex. "MON 1ER TRAIL"
  sub?: string; // petite ligne
  position: "top" | "bottom"; // où placer le texte (éviter le visage)
};

// Couverture TikTok 1080x1920. Le texte reste dans la zone centrale 3:4 (y 240–1680)
// visible sur la grille du profil.
export const Cover: React.FC<CoverProps> = ({ bg, day, highlight, sub, position }) => {
  const box: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 34px",
    borderRadius: 22,
    fontFamily,
    fontWeight: 900,
    lineHeight: 1.02,
    whiteSpace: "nowrap",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
  };
  const top = position === "top";
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Img src={staticFile(bg)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {/* léger dégradé pour faire ressortir le texte */}
      <AbsoluteFill
        style={{
          background: top
            ? "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 40%)"
            : "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 40%)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: top ? "flex-start" : "flex-end",
          paddingTop: top ? 270 : 0,
          paddingBottom: top ? 0 : 290,
          gap: 18,
        }}
      >
        <div style={{ ...box, fontSize: 150, color: "black", backgroundColor: "white" }}>{day}</div>
        <div style={{ ...box, fontSize: 112, color: "black", backgroundColor: ACCENT, transform: "rotate(-2deg)" }}>{highlight}</div>
        {sub && (
          <div
            style={{
              ...box,
              marginTop: 8,
              fontSize: 50,
              fontWeight: 800,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.72)",
              boxShadow: "none",
            }}
          >
            {sub}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
