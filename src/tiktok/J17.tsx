// J-17 — vidéo de lancement de la série « premier trail » (Leu Trail des Musées, 6 déc. 2026).
// Style naturel : coupes nettes, voix de la prise face caméra qui continue sur les plans d'ambiance,
// sous-titres simples sans animation, aucun bruitage, aucune carte animée.
// V4 : la piste son est faite de 8 phrases COMPLÈTES, chacune vérifiée seule à la transcription
// (aucun faux départ, aucune coupe au milieu d'un mot, rien avant la première phrase).
// Les changements d'image sont indépendants du son (le son ne repart plus à chaque plan).
// V5 : respiration avant l'affiche, plan de la mer plus long, plan Strava prolongé sur « Ça veut dire »,
// logo « S'abonner » à la fin (demandé par Quentin).
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// fc.mp4 = prise face caméra à partir de 18 s dans l'original ; tous les temps ci-dessous = temps original
const FC_OFFSET = 18;

// Phrases gardées (bornes choisies dans les silences, mesurés au 1/20 s)
const PIECES: [number, number][] = [
  [20.25, 23.25], // Il me reste 17 jours pour être capable de courir 26 km.
  [25.88, 28.85], // Moi c'est Quentin, j'ai 24 ans et j'habite sur l'île de La Réunion.
  [31.18, 33.4], // Le 6 décembre 2026,
  [37.22, 41.2], // un trail de 26 km avec plus de 500 m de dénivelé positif.
  [51.45, 55.0], // À l'heure où je vous parle, ma plus grande distance parcourue, c'est 18 km.
  [57.58, 59.2], // Ça veut dire qu'il m'en resterait 8.
  [62.6, 67.65], // Sur ce compte, je vais vous partager… jusqu'au jour J de la course.
  [79.65, 82.05], // Donc si toi aussi t'as envie de suivre l'aventure, n'hésite pas à t'abonner.
];
// Respirations ajoutées APRÈS une phrase (s) : la mer reste à l'écran, l'affiche arrive sur un temps.
const GAP_AFTER: number[] = [0, 1.0, 0.35, 0, 0, 0, 0, 0];
const STARTS: number[] = [];
PIECES.reduce((t, [a, b], i) => (STARTS.push(t), t + (b - a) + GAP_AFTER[i]), 0);
const VOICE_END = STARTS[STARTS.length - 1] + (PIECES[PIECES.length - 1][1] - PIECES[PIECES.length - 1][0]);
const TAIL = 1.6; // le drone continue après la dernière phrase
export const J17_FRAMES = f(VOICE_END + TAIL);

// temps original → temps monté
const mapT = (t: number) => {
  for (let i = 0; i < PIECES.length; i++) {
    const [a, b] = PIECES[i];
    if (t >= a && t <= b) return STARTS[i] + (t - a);
    if (t < a) return STARTS[i];
  }
  return VOICE_END;
};

type Vis =
  | { kind: "face" }
  | { kind: "img"; src: string }
  | { kind: "video"; src: string }
  | { kind: "strava"; src: string };
// Plans : [début (temps original), image]. Chaque plan dure jusqu'au suivant.
const SHOTS: [number, Vis][] = [
  [20.25, { kind: "face" }],
  [27.52, { kind: "video", src: "videos/j17/r_sea.mp4" }], // « et j'habite sur l'île de La Réunion »
  [31.18, { kind: "face" }],
  [33.4, { kind: "img", src: "videos/j17/v_affiche.jpg" }], // arrive pendant la respiration
  [51.45, { kind: "face" }],
  [52.35, { kind: "strava", src: "videos/j17/r_trail2.mp4" }],
  [58.15, { kind: "face" }], // le plan Strava continue sur « Ça veut dire » (il attendait avant de parler)
  [62.6, { kind: "video", src: "videos/j17/r_climb.mp4" }],
  [64.3, { kind: "video", src: "videos/j17/r_selfie.mp4" }],
  [65.95, { kind: "video", src: "videos/j17/r_sunset.mp4" }],
  [79.65, { kind: "video", src: "videos/j17/r_drone.mp4" }],
];

const SUBS: [number, number, string][] = [
  [20.25, 21.46, "Il me reste 17 jours"],
  [21.46, 23.25, "pour être capable de courir 26 kilomètres."],
  [25.88, 27.52, "Moi c’est Quentin, j’ai 24 ans"],
  [27.52, 28.85, "et j’habite sur l’île de La Réunion."],
  [31.18, 33.4, "Le 6 décembre 2026,"],
  [37.22, 38.72, "un trail de 26 kilomètres"],
  [38.72, 41.2, "avec plus de 500 mètres de dénivelé positif."],
  [51.45, 52.35, "À l’heure où je vous parle,"],
  [52.35, 53.9, "ma plus grande distance parcourue,"],
  [53.9, 55.0, "c’est 18 kilomètres."],
  [57.58, 59.2, "Ça veut dire qu’il m’en resterait 8."],
  [62.6, 64.5, "Sur ce compte, je vais vous partager"],
  [64.5, 65.75, "toutes mes réussites, mes galères,"],
  [65.75, 67.65, "mes entraînements jusqu’au jour J de la course."],
  [79.65, 81.2, "Donc si toi aussi t’as envie de suivre l’aventure,"],
  [81.2, 82.05, "n’hésite pas à t’abonner."],
];

const shadow = "0 0 3px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.55)";
const textStyle = { fontFamily: NEUTRE.font, color: "white", textShadow: shadow, textAlign: "center" as const };
const cover = { width: "100%", height: "100%", objectFit: "cover" as const };

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

// Le visage est synchronisé sur le son : pour chaque phrase, la vidéo face caméra démarre au même endroit
const FaceForPiece: React.FC = () => (
  <>
    {PIECES.map(([a, b], i) => (
      <Sequence key={i} from={f(STARTS[i])} durationInFrames={f(b - a)}>
        <OffthreadVideo src={staticFile("videos/j17/fc.mp4")} muted trimBefore={f(a - FC_OFFSET)} style={cover} />
      </Sequence>
    ))}
  </>
);

const Shot: React.FC<{ vis: Vis }> = ({ vis }) => {
  if (vis.kind === "face") return null; // le visage est dessous (FaceForPiece)
  if (vis.kind === "img") return <Img src={staticFile(vis.src)} style={cover} />;
  if (vis.kind === "video") return <OffthreadVideo src={staticFile(vis.src)} muted style={cover} />;
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(vis.src)} muted style={cover} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 45%)" }} />
      <StravaOverlay />
    </AbsoluteFill>
  );
};

// Petit logo « abonnement » façon TikTok, demandé par Quentin quand le drone part vers l'avant
const FOLLOW_AT = VOICE_END - 0.9;
const FollowBadge: React.FC = () => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [0, 8], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 120 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 999, padding: "14px 34px 14px 16px", boxShadow: "0 8px 26px rgba(0,0,0,0.3)", opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#FE2C55", color: "white", fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 52, lineHeight: "64px", textAlign: "center" }}>+</div>
        <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 44, color: "#161823" }}>S’abonner</div>
      </div>
    </AbsoluteFill>
  );
};

const EndFade: React.FC = () => {
  const fr = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: "black", opacity: interpolate(fr, [J17_FRAMES - 10, J17_FRAMES], [0, 1], clamp) }} />;
};

export const J17: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <FaceForPiece />
    {SHOTS.map(([t, vis], i) => {
      const from = f(mapT(t));
      const to = i + 1 < SHOTS.length ? f(mapT(SHOTS[i + 1][0])) : J17_FRAMES;
      if (vis.kind === "face" || to <= from) return null;
      return (
        <Sequence key={i} from={from} durationInFrames={to - from} premountFor={30}>
          <Shot vis={vis} />
        </Sequence>
      );
    })}

    {PIECES.map(([a, b], i) => {
      const len = f(b - a);
      return (
        <Sequence key={`a${i}`} from={f(STARTS[i])} durationInFrames={len}>
          <Audio src={staticFile("videos/j17/fc.mp4")} trimBefore={f(a - FC_OFFSET)} volume={(fr) => interpolate(fr, [0, 2, len - 2, len], [0, 1, 1, 0], clamp)} />
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
      const e = f(mapT(b));
      return (
        <Sequence key={i} from={s} durationInFrames={Math.max(1, e - s)}>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380 }}>
            <div style={{ ...textStyle, maxWidth: 900, fontWeight: 700, fontSize: 54, lineHeight: 1.2 }}>{t}</div>
          </AbsoluteFill>
        </Sequence>
      );
    })}
    <Sequence from={f(FOLLOW_AT)} durationInFrames={J17_FRAMES - f(FOLLOW_AT)}>
      <FollowBadge />
    </Sequence>
    <EndFade />
  </AbsoluteFill>
);
