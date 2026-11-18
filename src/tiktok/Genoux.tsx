// Vidéo courte « 3 exercices pour ne plus avoir mal aux genoux » (≈ 19 s, sans voix : portée par le texte).
// DA sobre (Inter, beige / marron / bleu) + hook « punch » (zoom autorisé seulement dans le hook).
import { AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BLUE = NEUTRE.blue;
const BROWN = NEUTRE.brown;

// clips préparés (déjà coupés) : public/videos/genoux/g_*.mp4
const CLIPS = [
  { src: "videos/genoux/g_hook1.mp4", dur: 1.5 }, // croise les bras
  { src: "videos/genoux/g_hook2.mp4", dur: 1.3 }, // montre 3 doigts
  { src: "videos/genoux/g_fente.mp4", dur: 5.0 },
  { src: "videos/genoux/g_chaise.mp4", dur: 4.0 },
  { src: "videos/genoux/g_step.mp4", dur: 4.5 },
  { src: "videos/genoux/g_fin.mp4", dur: 2.4 },
];
const START: number[] = [];
CLIPS.reduce((acc, c) => (START.push(acc), acc + c.dur), 0);
const T = {
  slam: 0.4, // les bras se croisent
  trois: START[1] + 0.2, // les 3 doigts
  ex1: START[2],
  ex2: START[3],
  ex3: START[4],
  fin: START[5],
};
export const GN_END = START[5] + CLIPS[5].dur;
export const GN_FRAMES = f(GN_END);

const EX = [
  { n: 1, name: "Fentes", reps: "3 × 10 par jambe", at: T.ex1, to: T.ex2 },
  { n: 2, name: "La chaise au mur", reps: "3 × 30 secondes", at: T.ex2, to: T.ex3 },
  { n: 3, name: "Montée sur chaise", reps: "3 × 10 par jambe", at: T.ex3, to: T.fin, left: true },
];

// ---------- Hook ----------
const pop = (fr: number, s: number, k = 2) => interpolate(fr, [f(s), f(s) + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(k)) });
const Hook: React.FC = () => {
  const fr = useCurrentFrame();
  const L = f(T.slam);
  const slam = interpolate(fr, [L, L + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  const p1 = interpolate(fr, [0, 4], [0.75, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const switchOut = interpolate(fr, [f(T.trois) - 3, f(T.trois)], [1, 0], clamp);
  const p3 = pop(fr, T.trois, 1.6);
  const p4 = pop(fr, T.trois + 0.35);
  const out = interpolate(fr, [f(T.ex1) - 3, f(T.ex1)], [1, 0], clamp);
  const big = { fontFamily: NEUTRE.font, fontWeight: 900, lineHeight: 1.02, color: "white", textShadow: "0 6px 30px rgba(0,0,0,0.6)", textAlign: "center" as const };
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: 0.42 * Math.max(slam * switchOut, p3) }} />
      {/* MAL AUX / GENOUX ? */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, opacity: switchOut }}>
        <div style={{ ...big, fontSize: 120, transform: `scale(${p1})` }}>MAL AUX</div>
        <div style={{ ...big, fontSize: 168, color: NEUTRE.beige, opacity: Math.min(1, slam * 2), transform: `scale(${interpolate(slam, [0, 1], [2.2, 1])})` }}>GENOUX&nbsp;?</div>
      </AbsoluteFill>
      {/* 3 EXERCICES */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, gap: 34 }}>
        <div style={{ ...big, fontSize: 128, whiteSpace: "nowrap", opacity: Math.min(1, p3 * 2), transform: `scale(${interpolate(p3, [0, 1], [2, 1])})` }}>
          <span style={{ color: NEUTRE.beige }}>3</span> EXERCICES
        </div>
        <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 52, color: BROWN, backgroundColor: NEUTRE.beigeT, padding: "14px 36px", borderRadius: 999, opacity: p4, transform: `translateY(${(1 - p4) * 20}px)`, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
          pour des genoux solides
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const hookScale = (fr: number) => {
  if (fr >= f(START[1])) return interpolate(fr, [f(START[1]), f(START[1]) + 6], [1.45, 1.22], { ...clamp, easing: Easing.out(Easing.cubic) });
  const arrive = interpolate(fr, [0, 7], [1.5, 1.22], { ...clamp, easing: Easing.out(Easing.cubic) });
  const push = interpolate(fr, [f(T.slam), f(T.slam) + 4], [1, 1.12], { ...clamp, easing: Easing.out(Easing.cubic) });
  return arrive * push;
};

// ---------- Étiquette d'exercice (en haut, sur le mur) ----------
// left : étiquette à gauche, à mi-hauteur (quand la tête monte en haut de l'image)
const ExLabel: React.FC<{ n: number; name: string; reps: string; frames: number; left?: boolean }> = ({ n, name, reps, frames, left }) => {
  const fr = useCurrentFrame();
  const a = interpolate(fr, [0, 7], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const b = interpolate(fr, [5, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const o = interpolate(fr, [frames - 4, frames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ paddingTop: left ? 1020 : 200, paddingLeft: left ? 28 : 0, alignItems: left ? "flex-start" : "center", opacity: o, fontFamily: NEUTRE.font }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: left ? "flex-start" : "center", gap: 18, transform: left ? "scale(0.68)" : undefined, transformOrigin: "0 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, backgroundColor: NEUTRE.beigeT, borderRadius: 999, padding: "14px 40px 14px 16px", boxShadow: "0 12px 34px rgba(0,0,0,0.25)", opacity: a, transform: `translateX(${(1 - a) * -80}px)` }}>
          <div style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: BLUE, color: "white", fontWeight: 900, fontSize: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
          <div style={{ fontWeight: 800, fontSize: 66, color: BROWN, whiteSpace: "nowrap" }}>{name}</div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 48, color: "white", backgroundColor: BROWN, borderRadius: 999, padding: "10px 32px", opacity: b, transform: `translateY(${(1 - b) * 16}px)`, boxShadow: "0 10px 26px rgba(0,0,0,0.25)" }}>{reps}</div>
      </div>
      {/* petits points 1/3 2/3 3/3 */}
      <div style={{ position: "absolute", bottom: 300, display: "flex", gap: 14, opacity: a }}>
        {[1, 2, 3].map((k) => (
          <div key={k} style={{ width: k === n ? 46 : 16, height: 16, borderRadius: 8, backgroundColor: k <= n ? "white" : "rgba(255,255,255,0.4)", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fin ----------
const Fin: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const a = interpolate(fr, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const b = interpolate(fr, [16, 24], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const pulse = 1 + 0.03 * Math.sin((fr / FPS) * Math.PI * 3) * b;
  return (
    <AbsoluteFill style={{ fontFamily: NEUTRE.font }}>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: 0.35 * a }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300 }}>
        <div style={{ width: 920, borderRadius: 36, backgroundColor: NEUTRE.beigeT, padding: "44px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, color: BROWN, boxShadow: "0 16px 44px rgba(0,0,0,0.3)", opacity: a, transform: `translateY(${(1 - a) * -24}px)` }}>
          <div style={{ fontWeight: 900, fontSize: 92, color: BLUE, lineHeight: 1 }}>2× par semaine</div>
          <div style={{ fontWeight: 700, fontSize: 46, textAlign: "center", lineHeight: 1.2 }}>Enregistre la vidéo pour ta prochaine séance</div>
        </div>
        <div style={{ marginTop: 34, fontWeight: 700, fontSize: 48, color: "white", backgroundColor: BROWN, padding: "14px 40px", borderRadius: 999, opacity: b, transform: `scale(${pulse})`, boxShadow: "0 10px 26px rgba(0,0,0,0.3)" }}>Abonne-toi pour la suite</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; name: string; volume: number }> = ({ at, name, volume }) => (
  <Sequence from={f(at)} durationInFrames={40}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const Genoux: React.FC<{ music?: boolean }> = ({ music = false }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {CLIPS.map((c, i) => {
        const v = <OffthreadVideo src={staticFile(c.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
        return (
          <Sequence key={i} from={f(START[i])} durationInFrames={f(START[i] + c.dur) - f(START[i])} premountFor={30}>
            {i < 2 ? <HookCam offset={f(START[i])}>{v}</HookCam> : v}
          </Sequence>
        );
      })}

      <Sequence from={0} durationInFrames={f(T.ex1)}>
        <Hook />
      </Sequence>
      {EX.map((e) => (
        <Sequence key={e.n} from={f(e.at)} durationInFrames={f(e.to) - f(e.at)}>
          <ExLabel n={e.n} name={e.name} reps={e.reps} left={"left" in e} frames={f(e.to) - f(e.at)} />
        </Sequence>
      ))}
      <Sequence from={f(T.fin)} durationInFrames={GN_FRAMES - f(T.fin)}>
        <Fin frames={GN_FRAMES - f(T.fin)} />
      </Sequence>

      {/* hook : arrivée + impacts */}
      <Sfx at={0} name="whoosh" volume={0.55} />
      <Sfx at={0.03} name="thud" volume={0.8} />
      <Sfx at={T.slam - 0.1} name="whoosh" volume={0.4} />
      <Sfx at={T.slam} name="thud" volume={1} />
      <Sfx at={T.slam} name="pop-lo" volume={0.55} />
      <Sfx at={T.trois} name="thud" volume={0.8} />
      <Sfx at={T.trois + 0.35} name="pop-hi" volume={0.45} />
      {EX.map((e) => (
        <Sfx key={`s${e.n}`} at={e.at} name="whoosh" volume={0.4} />
      ))}
      {EX.map((e) => (
        <Sfx key={`p${e.n}`} at={e.at + 0.2} name="pop-hi" volume={0.42} />
      ))}
      <Sfx at={T.fin} name="whoosh" volume={0.4} />
      <Sfx at={T.fin + 0.55} name="pop-mid" volume={0.45} />

      {music && <Audio src={staticFile("music/hotrock.mp3")} trimBefore={f(97)} volume={(fr) => interpolate(fr, [0, 6, GN_FRAMES - 20, GN_FRAMES], [0, 0.5, 0.5, 0], clamp)} />}
    </AbsoluteFill>
  );
};

const HookCam: React.FC<{ offset: number; children: React.ReactNode }> = ({ offset, children }) => {
  const fr = useCurrentFrame() + offset;
  return <AbsoluteFill style={{ transform: `scale(${hookScale(fr)})`, transformOrigin: "50% 38%" }}>{children}</AbsoluteFill>;
};
