// J-17 — vidéo de lancement de la série « premier trail » (Leu Trail des Musées, 6 déc. 2026).
// Style naturel : coupes nettes, voix de la prise face caméra qui continue sur les plans d'ambiance,
// sous-titres simples sans animation, aucun bruitage, aucune carte animée.
// V3 : faux départs retirés (« Moi c'est… » et « Ça veut dire que… » étaient dits deux fois),
// plus de plans d'ambiance, stats Strava en surimpression sur un plan de course (plus d'écran noir).
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// fc.mp4 = prise face caméra à partir de 18 s dans l'original (temps « src » = temps original)
const FC_OFFSET = 18;
type Vis =
  | { kind: "face" }
  | { kind: "img"; src: string }
  | { kind: "broll"; parts: [string, number][] }
  | { kind: "strava"; src: string };
type Seg = { in: number; out: number; vis: Vis };
const SEGS: Seg[] = [
  { in: 19.6, out: 23.45, vis: { kind: "face" } }, // Il me reste 17 jours…
  { in: 25.8, out: 27.45, vis: { kind: "face" } }, // Moi c'est Quentin, j'ai 24 ans
  { in: 27.45, out: 28.95, vis: { kind: "broll", parts: [["videos/j17/r_sea.mp4", 1.5]] } }, // et j'habite sur l'île de La Réunion
  { in: 31.2, out: 34.3, vis: { kind: "face" } }, // Le 6 décembre 2026, je vais prendre le départ…
  { in: 37.3, out: 41.25, vis: { kind: "img", src: "videos/j17/v_affiche.jpg" } }, // …un trail de 26 km, + de 500 m D+
  { in: 51.2, out: 52.4, vis: { kind: "face" } }, // À l'heure où je vous parle,
  { in: 52.4, out: 54.95, vis: { kind: "strava", src: "videos/j17/r_trail2.mp4" } }, // ma plus grande distance… 18 km
  { in: 56.95, out: 59.35, vis: { kind: "face" } }, // ça veut dire qu'il m'en resterait 8
  { in: 62.6, out: 67.6, vis: { kind: "broll", parts: [["videos/j17/r_climb.mp4", 1.7], ["videos/j17/r_selfie.mp4", 1.65], ["videos/j17/r_sunset.mp4", 1.65]] } },
  { in: 79.65, out: 82.05, vis: { kind: "broll", parts: [["videos/j17/r_drone.mp4", 4.0]] } },
];
const DRONE_TAIL = 1.6;
const STARTS: number[] = [];
SEGS.reduce((t, s) => (STARTS.push(t), t + (s.out - s.in)), 0);
const VOICE_END = STARTS[STARTS.length - 1] + (SEGS[SEGS.length - 1].out - SEGS[SEGS.length - 1].in);
export const J17_FRAMES = f(VOICE_END + DRONE_TAIL);

const mapT = (t: number, isEnd = false) => {
  for (let i = 0; i < SEGS.length; i++) {
    const s = SEGS[i];
    if (isEnd ? t > s.in && t <= s.out : t >= s.in && t < s.out) return STARTS[i] + (t - s.in);
    if (t < s.in) return STARTS[i];
  }
  return VOICE_END;
};

const SUBS: [number, number, string][] = [
  [20.11, 21.45, "Il me reste 17 jours"],
  [21.45, 23.45, "pour être capable de courir 26 kilomètres."],
  [25.9, 27.45, "Moi c’est Quentin, j’ai 24 ans"],
  [27.45, 28.95, "et j’habite sur l’île de La Réunion."],
  [31.2, 33.4, "Le 6 décembre 2026,"],
  [33.4, 34.3, "je vais prendre le départ…"],
  [37.3, 38.76, "un trail de 26 kilomètres"],
  [38.76, 41.25, "avec plus de 500 mètres de dénivelé positif."],
  [51.2, 52.4, "À l’heure où je vous parle,"],
  [52.4, 53.8, "ma plus grande distance parcourue"],
  [53.8, 54.95, "est de 18 kilomètres."],
  [56.95, 59.35, "Ça veut dire qu’il m’en resterait 8."],
  [62.6, 64.4, "Sur ce compte, je vais vous partager"],
  [64.4, 65.7, "toutes mes réussites, mes galères,"],
  [65.7, 67.6, "mes entraînements jusqu’au jour J de la course."],
  [79.65, 81.15, "Si toi aussi tu as envie de suivre l’aventure,"],
  [81.15, 82.05, "n’hésite pas à t’abonner."],
];

const shadow = "0 0 3px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.55)";
const textStyle = { fontFamily: NEUTRE.font, color: "white", textShadow: shadow, textAlign: "center" as const };
const cover = { width: "100%", height: "100%", objectFit: "cover" as const };

// Surimpression façon « partage Strava » posée sur un vrai plan de course
const StravaOverlay: React.FC = () => {
  const stat = (label: string, value: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ ...textStyle, fontWeight: 600, fontSize: 30, opacity: 0.95 }}>{label}</div>
      <div style={{ ...textStyle, fontWeight: 800, fontSize: 62, lineHeight: 1.05 }}>{value}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, gap: 26 }}>
      <Img src={staticFile("videos/j17/trace_t.png")} style={{ width: 460, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }} />
      <div style={{ display: "flex", gap: 56 }}>
        {stat("Distance", "18,00 km")}
        {stat("D+", "484 m")}
        {stat("Temps", "2 h 22")}
      </div>
    </AbsoluteFill>
  );
};

const Visual: React.FC<{ seg: Seg; frames: number }> = ({ seg, frames }) => {
  const v = seg.vis;
  if (v.kind === "face") return <OffthreadVideo src={staticFile("videos/j17/fc.mp4")} muted trimBefore={f(seg.in - FC_OFFSET)} style={cover} />;
  if (v.kind === "img") return <Img src={staticFile(v.src)} style={cover} />;
  if (v.kind === "strava")
    return (
      <AbsoluteFill>
        <OffthreadVideo src={staticFile(v.src)} muted style={cover} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 45%)" }} />
        <StravaOverlay />
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
            <OffthreadVideo src={staticFile(src)} muted style={cover} />
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
      const aLen = f(s.out - s.in);
      return (
        <Sequence key={i} from={from} durationInFrames={dur} premountFor={30}>
          <Visual seg={s} frames={dur} />
          <Sequence durationInFrames={aLen}>
            {/* micro-fondus de 2 images à chaque coupe : pas de « clic » */}
            <Audio src={staticFile("videos/j17/fc.mp4")} trimBefore={f(s.in - FC_OFFSET)} volume={(fr) => interpolate(fr, [0, 2, aLen - 2, aLen], [0, 1, 1, 0], clamp)} />
          </Sequence>
        </Sequence>
      );
    })}

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
