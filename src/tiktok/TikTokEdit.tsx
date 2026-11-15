import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { f, placeClips, PlacedClip, VideoEdit } from "./types";

const fontFamily = "Montserrat";
for (const weight of ["700", "800", "900"]) {
  loadFont({ family: fontFamily, url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`), weight });
}

const ACCENT = "#FFD60A";
const MUSIC_TALK = 0.09; // musique sous la voix
const MUSIC_BROLL = 0.4; // musique sur les paysages

// ---------- Un plan vidéo ----------
const ClipView: React.FC<{ clip: PlacedClip; src: string; index: number }> = ({ clip, src, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let scale: number;
  if (clip.kind === "talk") {
    // léger zoom continu + « punch » d'entrée
    const base = clip.zoom ?? 1;
    const punch = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 6 });
    scale = base * interpolate(punch, [0, 1], [1.04, 1]) * interpolate(frame, [0, clip.frames], [1, 1.04]);
  } else {
    // paysages : zoom avant ou arrière alterné
    const dir = index % 2 === 0;
    scale = interpolate(frame, [0, clip.frames], dir ? [1.08, 1.18] : [1.18, 1.08]);
    const punch = interpolate(frame, [0, 5], [1.12, 1], { extrapolateRight: "clamp" });
    scale *= punch;
  }

  // petit flash blanc à l'entrée des plans de paysage
  const flash = clip.kind === "broll" ? interpolate(frame, [0, 3], [0.35, 0], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <OffthreadVideo
        src={staticFile(src)}
        trimBefore={f(clip.in)}
        trimAfter={f(clip.out)}
        volume={clip.kind === "talk" ? 1 : 0.2}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
      />
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: "white", opacity: flash }} />}
    </AbsoluteFill>
  );
};

// ---------- Hook ----------
const Hook: React.FC<{ hook: VideoEdit["hook"] }> = ({ hook }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = f(hook.duration);
  const pop = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 180 } });
  const out = interpolate(frame, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wiggle = Math.sin(frame / 3) * 1.2;

  const box: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 26px",
    borderRadius: 18,
    fontFamily,
    fontWeight: 900,
    lineHeight: 1.05,
    textAlign: "center",
  };

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 430, opacity: out }}>
      <div style={{ transform: `scale(${pop(0)})` }}>
        <span style={{ ...box, fontSize: 62, color: "black", backgroundColor: "white", whiteSpace: "nowrap" }}>{hook.top}</span>
      </div>
      <div style={{ marginTop: 14, transform: `scale(${pop(5)}) rotate(${-2 + wiggle}deg)` }}>
        <span style={{ ...box, fontSize: 100, color: "black", backgroundColor: ACCENT, whiteSpace: "nowrap" }}>{hook.highlight}</span>
      </div>
      {hook.sub && (
        <div style={{ marginTop: 26, transform: `translateY(${interpolate(pop(12), [0, 1], [40, 0])}px)`, opacity: pop(12) }}>
          <span
            style={{
              ...box,
              fontSize: 46,
              fontWeight: 800,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.65)",
            }}
          >
            {hook.sub}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Sous-titres classiques ----------
const SubtitleLine: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 220 }, durationInFrames: 8 });
  const out = interpolate(frame, [frames - 2, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 520 }}>
      <div
        style={{
          maxWidth: 900,
          textAlign: "center",
          fontFamily,
          fontWeight: 800,
          fontSize: 72,
          lineHeight: 1.15,
          color: "white",
          WebkitTextStroke: "14px black",
          paintOrder: "stroke fill",
          textShadow: "0 6px 18px rgba(0,0,0,0.55)",
          transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`,
          opacity: out,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Convertit un temps source en image de la vidéo finale (si ce moment a été gardé)
const toOutputFrame = (clips: PlacedClip[], sec: number): number | null => {
  for (const c of clips) {
    if (sec >= c.in - 0.001 && sec <= c.out + 0.001) return c.from + (f(sec) - f(c.in));
  }
  return null;
};

// ---------- Barre de progression ----------
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, backgroundColor: ACCENT }} />
    </AbsoluteFill>
  );
};

// ---------- Appel à l'action ----------
const Cta: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 330 }}>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 58,
          color: "black",
          backgroundColor: ACCENT,
          padding: "16px 34px",
          borderRadius: 20,
          textAlign: "center",
          maxWidth: 880,
          transform: `scale(${pop}) rotate(-2deg)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Composition complète ----------
export const TikTokEdit: React.FC<{ edit: VideoEdit; music: string }> = ({ edit, music }) => {
  const clips = placeClips(edit.clips);
  const last = clips[clips.length - 1];

  // volume de la musique : bas sous la voix, fort sur les paysages
  const musicVolume = (frame: number) => {
    const c = clips.find((cl) => frame >= cl.from && frame < cl.from + cl.frames) ?? last;
    const target = c.kind === "talk" ? MUSIC_TALK : MUSIC_BROLL;
    // transition douce sur 5 images autour des changements de plan
    const prev = clips[clips.indexOf(c) - 1];
    if (prev) {
      const prevTarget = prev.kind === "talk" ? MUSIC_TALK : MUSIC_BROLL;
      return interpolate(frame, [c.from, c.from + 5], [prevTarget, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    }
    return target;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {clips.map((c, i) => (
        <Sequence key={i} from={c.from} durationInFrames={c.frames} premountFor={30}>
          <ClipView clip={c} src={edit.src} index={i} />
        </Sequence>
      ))}

      {edit.subtitles.map((s, i) => {
        const from = toOutputFrame(clips, s.s);
        const to = toOutputFrame(clips, s.e);
        if (from === null || to === null || to <= from) return null;
        return (
          <Sequence key={`sub-${i}`} from={from} durationInFrames={to - from}>
            <SubtitleLine text={s.t} frames={to - from} />
          </Sequence>
        );
      })}

      <Sequence durationInFrames={f(edit.hook.duration)}>
        <Hook hook={edit.hook} />
      </Sequence>

      {edit.cta && (
        <Sequence from={last.from + 10} durationInFrames={last.frames - 10}>
          <Cta text={edit.cta} />
        </Sequence>
      )}

      <ProgressBar />
      <Audio src={staticFile(music)} volume={musicVolume} />
    </AbsoluteFill>
  );
};
