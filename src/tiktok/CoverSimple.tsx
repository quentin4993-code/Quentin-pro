// Couverture « naturelle » (nouvelle direction, 19/11/2026) : une vraie image de la vidéo + 3-4 mots,
// texte blanc simple avec ombre, placé dans la zone visible sur la grille du profil (y 240–1680).
import { AbsoluteFill, Img, staticFile } from "remotion";
import { NEUTRE } from "./neutre";

export type CoverSimpleProps = { img: string; big: string; small?: string; top?: number; bigSize?: number };
const shadow = "0 0 4px rgba(0,0,0,0.85), 0 4px 18px rgba(0,0,0,0.55)";

export const CoverSimple: React.FC<CoverSimpleProps> = ({ img, big, small, top = 300, bigSize = 150 }) => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <Img src={staticFile(img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%)" }} />
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top, gap: 10 }}>
      <div style={{ fontFamily: NEUTRE.font, fontWeight: 800, fontSize: bigSize, lineHeight: 1.02, color: "white", textShadow: shadow, textAlign: "center", maxWidth: 980 }}>{big}</div>
      {small && <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 64, color: "white", textShadow: shadow, textAlign: "center" }}>{small}</div>}
    </AbsoluteFill>
  </AbsoluteFill>
);
