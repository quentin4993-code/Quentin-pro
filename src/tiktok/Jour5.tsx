// « Jour 5/22 » — séance renfo. DA sobre (Inter, blanc / beige / marron), musique funk-rock calée sur les temps.
import { AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";
import { J5_CLIPS, J5_DROP, J5_MUSIC, J5_SEG } from "./jour5.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const J5_FRAMES = J5_CLIPS.reduce((n, c) => n + (f(c.out) - f(c.in)), 0);

const shadow = "0 0 3px rgba(0,0,0,0.7), 0 2px 14px rgba(0,0,0,0.5)";

// fondu d'entrée / de sortie (en images, relatif à la Sequence)
const useFade = (frames: number, inF = 6, outF = 6) => {
  const fr = useCurrentFrame();
  return Math.min(interpolate(fr, [0, inF], [0, 1], clamp), interpolate(fr, [frames - outF, frames], [1, 0], clamp));
};

// ---------- Sous-titres (temps de la vidéo finale) ----------
const SUBS: [number, number, string][] = [
  [0.3, 2.0, "On est jour 5 sur 22"],
  [2.0, 3.46, "avant mon premier trail officiel"],
  [3.46, 4.86, "et aujourd'hui, c'est séance…"],
  [5.56, 6.7, "Let's go !"],
  [6.7, 8.3, "Le programme de la séance :"],
  [8.34, 10.6, "un circuit training avec 5 tours"],
  [10.62, 12.3, "où on va faire 10 squats,"],
  [12.3, 14.2, "10 pompes, 10 burpees"],
  [14.2, 15.77, "et 10 fentes de chaque côté"],
  [15.77, 17.33, "Mais avant ça, on va faire"],
  [17.33, 18.73, "un échauffement de 10-15 minutes"],
  [18.73, 20.87, "avec des gammes et un peu de course,"],
  [20.87, 22.4, "histoire de ne pas se blesser"],
  [23.55, 25.1, "Et puis c'est parti, let's go !"],
];

export const Sub: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const o = useFade(frames, 3, 2);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 600 }}>
      <div style={{ maxWidth: 880, textAlign: "center", fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 54, lineHeight: 1.22, color: "white", textShadow: shadow, opacity: o }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Hook ----------
export const Hook: React.FC<{ frames: number; instant?: boolean }> = ({ frames, instant }) => {
  const fr = useCurrentFrame() + (instant ? 30 : 0); // instant : tout est déjà affiché à la 1re image
  const a = interpolate(fr, [2, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const b = interpolate(fr, [12, 22], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const c = interpolate(fr, [22, 30], [0, 1], clamp);
  const out = interpolate(fr - (instant ? 30 : 0), [frames - 6, frames], [1, 0], clamp);
  const line: React.CSSProperties = { fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 60, lineHeight: 1.15, color: "white", textShadow: shadow, textAlign: "center" };
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 270, opacity: out }}>
      <div style={{ ...line, opacity: a, transform: `translateY(${(1 - a) * 16}px)` }}>Pas un seul kilomètre aujourd'hui…</div>
      <div style={{ ...line, marginTop: 6, opacity: b, transform: `translateY(${(1 - b) * 16}px)` }}>et pourtant, ça va piquer.</div>
      <div
        style={{
          marginTop: 22,
          fontFamily: NEUTRE.font,
          fontWeight: 600,
          fontSize: 36,
          color: NEUTRE.brown,
          backgroundColor: NEUTRE.beigeT,
          padding: "8px 22px",
          borderRadius: 999,
          opacity: c,
        }}
      >
        Jour 5/22 · prépa 1er trail
      </div>
    </AbsoluteFill>
  );
};

// ---------- « RENFO » qui s'ouvre entre les mains ----------
// mains jointes au-dessus de la tête puis écartées : le mot se dévoile du centre vers les côtés.
export const Renfo: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const open = interpolate(fr, [0, 7], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const out = interpolate(fr, [frames - 5, frames], [1, 0], clamp);
  const side = (1 - open) * 50; // % masqué de chaque côté
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 425, opacity: out }}>
      <div
        style={{
          fontFamily: NEUTRE.font,
          fontWeight: 800,
          fontSize: 160,
          letterSpacing: 10,
          color: "white",
          textShadow: "0 4px 24px rgba(0,0,0,0.45)",
          clipPath: `inset(0 ${side}% 0 ${side}%)`,
          transform: `scale(${interpolate(open, [0, 1], [0.92, 1])})`,
        }}
      >
        RENFO
      </div>
    </AbsoluteFill>
  );
};

// ---------- Carte « programme » qui se remplit pendant l'explication ----------
const PROGRAM: [number, string][] = [
  [9.78, "Circuit training · 5 tours"],
  [11.74, "10 squats"],
  [12.84, "10 pompes"],
  [13.64, "10 burpees"],
  [14.86, "10 fentes de chaque côté"],
];
const Program: React.FC<{ start: number; frames: number }> = ({ start, frames }) => {
  const fr = useCurrentFrame();
  const card = useFade(frames, 8, 8);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
      <div
        style={{
          minWidth: 600,
          padding: "26px 40px",
          borderRadius: 28,
          backgroundColor: NEUTRE.beigeT,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          opacity: card,
          fontFamily: NEUTRE.font,
          color: NEUTRE.brown,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2, opacity: 0.6, marginBottom: 12 }}>LE PROGRAMME</div>
        {PROGRAM.map(([t, txt], i) => {
          const a = interpolate(fr, [f(t - start), f(t - start) + 6], [0, 1], clamp);
          return (
            <div key={txt} style={{ fontWeight: i === 0 ? 700 : 600, fontSize: i === 0 ? 42 : 40, lineHeight: 1.45, opacity: a, transform: `translateX(${(1 - a) * 14}px)` }}>
              {i === 0 ? txt : `—  ${txt}`}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Étiquette de section (en haut) ----------
export const SectionTag: React.FC<{ text: string; frames: number; top?: number }> = ({ text, frames, top = 240 }) => {
  const o = useFade(frames, 8, 8);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top }}>
      <div
        style={{
          fontFamily: NEUTRE.font,
          fontWeight: 600,
          fontSize: 40,
          color: NEUTRE.brown,
          backgroundColor: NEUTRE.beigeT,
          padding: "10px 28px",
          borderRadius: 999,
          boxShadow: "0 8px 22px rgba(0,0,0,0.15)",
          opacity: o,
          transform: `translateY(${(1 - o) * -10}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Titre d'exercice (bas d'écran) ----------
export const Exo: React.FC<{ title: string; detail?: string; frames: number; small?: boolean; top?: number }> = ({ title, detail, frames, small, top = 335 }) => {
  const fr = useCurrentFrame();
  const a = interpolate(fr, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const b = interpolate(fr, [5, 13], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const out = interpolate(fr, [frames - 5, frames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top, opacity: out }}>
      <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: small ? 56 : 84, color: "white", textShadow: shadow, opacity: a, transform: `translateY(${(1 - a) * 18}px)` }}>
        {title}
      </div>
      {detail && (
        <div style={{ marginTop: 6, fontFamily: NEUTRE.font, fontWeight: 500, fontSize: small ? 36 : 46, color: "white", textShadow: shadow, opacity: b }}>{detail}</div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Fin ----------
export const Cta: React.FC = () => {
  const fr = useCurrentFrame();
  const a = interpolate(fr, [0, 10], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300 }}>
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
          transform: `translateY(${(1 - a) * 16}px)`,
        }}
      >
        Abonne-toi pour la suite
      </div>
    </AbsoluteFill>
  );
};

export const At: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => (
  <Sequence from={f(from)} durationInFrames={Math.max(1, f(to) - f(from))}>
    {children}
  </Sequence>
);

export const Jour5: React.FC<{ music?: boolean }> = ({ music = true }) => {
  // plans à la suite
  let pos = 0;
  const placed = J5_CLIPS.map((c) => {
    const frames = f(c.out) - f(c.in);
    const p = { ...c, from: pos, frames };
    pos += frames;
    return p;
  });
  const end = pos / FPS;
  const S = J5_SEG;
  const dropF = f(J5_DROP);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {placed.map((c, i) => (
        <Sequence key={i} from={c.from} durationInFrames={c.frames} premountFor={30}>
          <OffthreadVideo
            src={staticFile(c.src)}
            trimBefore={f(c.in)}
            trimAfter={f(c.in) + c.frames}
            volume={c.from < dropF ? 1 : 0} // voix sur l'intro ; plans d'action : seulement la musique
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Sequence>
      ))}

      {/* intro */}
      <At from={0} to={4.15}>
        <Hook frames={f(4.15)} />
      </At>
      <At from={4.25} to={5.55}>
        <Renfo frames={f(5.55) - f(4.25)} />
      </At>
      <At from={9.6} to={15.77}>
        <Program start={9.6} frames={f(15.77) - f(9.6)} />
      </At>
      {SUBS.map(([a, b, t], i) => (
        <At key={i} from={a} to={b}>
          <Sub text={t} frames={f(b) - f(a)} />
        </At>
      ))}

      {/* sac + matos */}
      <At from={S.sac[0]} to={S.matos[1]}>
        <SectionTag text="Le matos du jour" frames={f(S.matos[1]) - f(S.sac[0])} />
      </At>

      {/* échauffement */}
      <At from={S.elastique[0]} to={S.genoux[1]}>
        <SectionTag text="Échauffement · 10-15 min" frames={f(S.genoux[1]) - f(S.elastique[0])} />
      </At>
      {(
        [
          ["elastique", "Élastique"],
          ["tete", "Rotations de tête"],
          ["hanches", "Rotations de hanches"],
          ["genoux", "Genoux"],
        ] as const
      ).map(([k, t]) => (
        <At key={k} from={S[k][0]} to={S[k][1]}>
          <Exo title={t} frames={f(S[k][1]) - f(S[k][0])} small />
        </At>
      ))}

      {/* circuit */}
      <At from={S.squats[0]} to={S.burpees[1]}>
        <SectionTag text="Circuit training · 5 tours" frames={f(S.burpees[1]) - f(S.squats[0])} />
      </At>
      {(
        [
          ["squats", "Squats", "10 répétitions"],
          ["pompes", "Pompes", "10 répétitions"],
          ["fentes", "Fentes", "10 de chaque côté"],
          ["burpees", "Burpees", "10 répétitions"],
        ] as const
      ).map(([k, t, d]) => (
        <At key={k} from={S[k][0]} to={S[k][1]}>
          <Exo title={t} detail={d} frames={f(S[k][1]) - f(S[k][0])} />
        </At>
      ))}

      {/* corde à sauter + fin */}
      <At from={S.corde[0]} to={end - 2.4}>
        <SectionTag text="Pour finir" frames={f(end - 2.4) - f(S.corde[0])} top={220} />
      </At>
      <At from={S.corde[0]} to={end - 2.4}>
        <Exo title="Corde à sauter" detail="5 × 1 minute" frames={f(end - 2.4) - f(S.corde[0])} top={315} />
      </At>
      <At from={end - 2.4} to={end}>
        <Cta />
      </At>

      {music && (
        <Audio
          src={staticFile(J5_MUSIC.src)}
          trimBefore={f(J5_MUSIC.offset)}
          volume={(fr) =>
            interpolate(fr, [0, 6, dropF - 6, dropF, pos - 30, pos], [0, 0.2, 0.2, 0.75, 0.75, 0], clamp)
          }
        />
      )}
    </AbsoluteFill>
  );
};
