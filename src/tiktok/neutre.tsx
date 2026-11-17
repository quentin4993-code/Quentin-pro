// DA « neutre » (test Jour 4) : présentation plus naturelle, moins « IA ».
// Police Inter en casse normale, palette beige / marron / blanc + touche de bleu,
// animations douces (fondus, petits glissements), pas de blocs jaunes ni de secousses.
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/fonts";

export const NEUTRE = {
  font: "Inter",
  beige: "#F4EEE4",
  beigeT: "rgba(244, 238, 228, 0.93)",
  brown: "#4E3B2C",
  brownSoft: "rgba(78, 59, 44, 0.55)",
  blue: "#3E6A9E",
  white: "#FFFFFF",
  shadow: "0 2px 10px rgba(0,0,0,0.45)",
};

for (const weight of ["400", "500", "600", "700"]) {
  loadFont({ family: NEUTRE.font, url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`), weight });
}

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Hook : titre simple + petite ligne, fondu doux ----------
export const HookNeutre: React.FC<{ top: string; highlight: string; sub?: string; frames: number }> = ({ top, highlight, sub, frames }) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [0, 8], [0, 1], clamp);
  const b = interpolate(frame, [6, 14], [0, 1], clamp);
  const out = interpolate(frame, [frames - 6, frames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, opacity: out }}>
      <div
        style={{
          fontFamily: NEUTRE.font,
          fontWeight: 700,
          fontSize: 66,
          lineHeight: 1.12,
          color: NEUTRE.white,
          textAlign: "center",
          maxWidth: 900,
          textShadow: NEUTRE.shadow,
          opacity: a,
          transform: `translateY(${interpolate(a, [0, 1], [14, 0])}px)`,
        }}
      >
        {top}
        <br />
        {highlight}
      </div>
      {sub && (
        <div
          style={{
            marginTop: 18,
            fontFamily: NEUTRE.font,
            fontWeight: 500,
            fontSize: 38,
            color: NEUTRE.brown,
            backgroundColor: NEUTRE.beigeT,
            padding: "8px 22px",
            borderRadius: 999,
            opacity: b,
            transform: `translateY(${interpolate(b, [0, 1], [10, 0])}px)`,
          }}
        >
          {sub}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Sous-titres classiques : blanc, ombre légère ----------
export const SubtitleNeutre: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const frame = useCurrentFrame();
  const o = Math.min(interpolate(frame, [0, 3], [0, 1], clamp), interpolate(frame, [frames - 2, frames], [1, 0], clamp));
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 600 }}>
      <div
        style={{
          maxWidth: 880,
          textAlign: "center",
          fontFamily: NEUTRE.font,
          fontWeight: 600,
          fontSize: 54,
          lineHeight: 1.22,
          color: NEUTRE.white,
          textShadow: "0 0 3px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.55)",
          opacity: o,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fin : pastille beige, fondu ----------
export const CtaNeutre: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [0, 10], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 330 }}>
      <div
        style={{
          fontFamily: NEUTRE.font,
          fontWeight: 600,
          fontSize: 44,
          color: NEUTRE.brown,
          backgroundColor: NEUTRE.beigeT,
          padding: "14px 32px",
          borderRadius: 999,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          opacity: a,
          transform: `translateY(${interpolate(a, [0, 1], [16, 0])}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
