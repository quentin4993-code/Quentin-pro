// J-17 — vidéo de lancement de la série « premier trail » (Leu Trail des Musées, 6 déc. 2026).
// NOUVEAU STYLE naturel : coupes nettes sur les blancs, voix de la prise face caméra qui continue
// sur les plans d'ambiance, sous-titres simples sans animation, aucun bruitage, aucune carte animée.
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// fc.mp4 = prise face caméra à partir de 18 s dans l'original (temps « src » = temps original)
const FC_OFFSET = 18;
type Vis = { kind: "face" } | { kind: "img"; src: string; label?: string } | { kind: "broll"; parts: [string, number][] };
type Seg = { in: number; out: number; vis: Vis };
const SEGS: Seg[] = [
  { in: 19.6, out: 23.45, vis: { kind: "face" } },
  { in: 24.0, out: 24.7, vis: { kind: "face" } },
  { in: 25.98, out: 28.95, vis: { kind: "face" } },
  { in: 31.2, out: 34.3, vis: { kind: "face" } },
  { in: 37.3, out: 41.25, vis: { kind: "img", src: "videos/j17/v_affiche.jpg" } },
  { in: 51.2, out: 52.4, vis: { kind: "face" } },
  { in: 52.4, out: 54.95, vis: { kind: "img", src: "videos/j17/v_trace.jpg", label: "18 km" } },
  { in: 55.2, out: 56.85, vis: { kind: "face" } },
  { in: 57.55, out: 59.35, vis: { kind: "face" } },
  { in: 62.6, out: 67.6, vis: { kind: "broll", parts: [["videos/j17/r_trail.mp4", 1.7], ["videos/j17/r_climb.mp4", 1.65], ["videos/j17/r_sunset.mp4", 1.65]] } },
  { in: 79.65, out: 82.05, vis: { kind: "broll", parts: [["videos/j17/r_drone.mp4", 4.0]] } },
];
const DRONE_TAIL = 1.6; // le drone continue après la dernière phrase
const STARTS: number[] = [];
SEGS.reduce((t, s) => (STARTS.push(t), t + (s.out - s.in)), 0);
const VOICE_END = STARTS[STARTS.length - 1] + (SEGS[SEGS.length - 1].out - SEGS[SEGS.length - 1].in);
export const J17_FRAMES = f(VOICE_END + DRONE_TAIL);

// temps original → temps de la vidéo montée
const mapT = (t: number, isEnd = false) => {
  for (let i = 0; i < SEGS.length; i++) {
    const s = SEGS[i];
    if (isEnd ? t > s.in && t <= s.out : t >= s.in && t < s.out) return STARTS[i] + (t - s.in);
    if (t < s.in) return STARTS[i]; // dans un blanc coupé → début du segment suivant
  }
  return VOICE_END;
};

const SUBS: [number, number, string][] = [
  [20.11, 21.45, "Il me reste 17 jours"],
  [21.45, 23.45, "pour être capable de courir 26 kilomètres."],
  [24.0, 27.55, "Moi c’est Quentin, j’ai 24 ans"],
  [27.55, 28.95, "et j’habite sur l’île de La Réunion."],
  [31.29, 33.4, "Le 6 décembre 2026,"],
  [33.4, 34.3, "je vais prendre le départ…"],
  [37.33, 38.76, "un trail de 26 kilomètres"],
  [38.76, 41.25, "avec plus de 500 mètres de dénivelé positif."],
  [51.2, 52.4, "À l’heure où je vous parle,"],
  [52.4, 53.8, "ma plus grande distance parcourue"],
  [53.8, 54.95, "est de 18 kilomètres."],
  [55.2, 59.35, "Ça veut dire qu’il m’en resterait 8."],
  [62.6, 64.4, "Sur ce compte, je vais vous partager"],
  [64.4, 65.7, "toutes mes réussites, mes galères,"],
  [65.7, 67.6, "mes entraînements jusqu’au jour J de la course."],
  [79.65, 81.15, "Si toi aussi tu as envie de suivre l’aventure,"],
  [81.15, 82.05, "n’hésite pas à t’abonner."],
];

const textStyle = { fontFamily: NEUTRE.font, color: "white", textShadow: "0 0 3px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.55)", textAlign: "center" as const };

const Visual: React.FC<{ seg: Seg; frames: number }> = ({ seg, frames }) => {
  const v = seg.vis;
  if (v.kind === "face")
    return <OffthreadVideo src={staticFile("videos/j17/fc.mp4")} muted trimBefore={f(seg.in - FC_OFFSET)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  if (v.kind === "img")
    return (
      <AbsoluteFill>
        <Img src={staticFile(v.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {v.label && (
          <AbsoluteFill style={{ alignItems: "center", paddingTop: 470 }}>
            <div style={{ ...textStyle, fontWeight: 800, fontSize: 130 }}>{v.label}</div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    );
  let t = 0;
  return (
    <AbsoluteFill>
      {v.parts.map(([src, d], i) => {
        const from = f(t);
        t += d;
        const dur = i === v.parts.length - 1 ? frames - from : f(t) - from;
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(1, dur)}>
            <OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const EndFade: React.FC = () => {
  const fr = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: "black", opacity: interpolate(fr, [J17_FRAMES - 10, J17_FRAMES], [0, 1], clamp) }} />;
};

export const J17: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    {SEGS.map((s, i) => {
      const from = f(STARTS[i]);
      const isLast = i === SEGS.length - 1;
      const dur = (isLast ? J17_FRAMES : f(STARTS[i + 1])) - from;
      return (
        <Sequence key={i} from={from} durationInFrames={dur} premountFor={30}>
          <Visual seg={s} frames={dur} />
          {/* la voix vient toujours de la prise face caméra */}
          <Sequence durationInFrames={f(s.out - s.in)}>
            <Audio src={staticFile("videos/j17/fc.mp4")} trimBefore={f(s.in - FC_OFFSET)} />
          </Sequence>
        </Sequence>
      );
    })}

    {/* J-17, seule phrase de hook à l'écran */}
    <Sequence from={0} durationInFrames={f(STARTS[1])}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
        <div style={{ ...textStyle, fontWeight: 800, fontSize: 110 }}>J-17</div>
      </AbsoluteFill>
    </Sequence>

    {SUBS.map(([a, b, t], i) => {
      const s = f(mapT(a));
      const e = f(mapT(b, true));
      return (
        <Sequence key={i} from={s} durationInFrames={Math.max(1, e - s)}>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380 }}>
            <div style={{ ...textStyle, maxWidth: 900, fontWeight: 700, fontSize: 54, lineHeight: 1.2 }}>{t}</div>
          </AbsoluteFill>
        </Sequence>
      );
    })}
    <EndFade />
  </AbsoluteFill>
);
