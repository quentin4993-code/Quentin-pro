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
import { f, placeClips, PlacedClip, toOutputFrame, VideoEdit } from "./types";
import { ACCENT, fontFamily } from "./style";
import { Counter, Progress, shakeOffset, Slam } from "./Animations";
import { Circuit } from "./Circuit";

const MUSIC_TALK = 0.09; // musique sous la voix
const MUSIC_BROLL = 0.4; // musique sur les paysages
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- Un plan vidéo (sans zoom) ----------
// Les plans de paysage entrent en fondu court par-dessus le plan précédent.
const XF = 6; // durée du fondu en images

const ClipView: React.FC<{ clip: PlacedClip; src: string; fadeIn: boolean; extend: number }> = ({ clip, src, fadeIn, extend }) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn ? interpolate(frame, [0, XF], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ backgroundColor: "black", opacity }}>
      <OffthreadVideo
        src={staticFile(src)}
        trimBefore={f(clip.in)}
        trimAfter={f(clip.out) + extend}
        volume={(fr) => (clip.kind === "talk" ? 1 : 0.2) * (fr >= clip.frames ? 0 : 1)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

// ---------- Hook ----------
// Placé exactement sur l'ancien texte « JOUR 3/22 » effacé de la source (y ≈ 235–370).
const Hook: React.FC<{ hook: VideoEdit["hook"] }> = ({ hook }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = f(hook.duration);
  const slam = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 220, mass: 0.7 } });
  const out = interpolate(frame, [dur - 5, dur], [1, 0], clamp);
  const wiggle = Math.sin(frame / 3) * 1.2;
  // secousse quand le 2e bloc tombe
  const impact = Math.max(0, 1 - Math.abs(frame - 9) / 5);
  const shakeX = Math.sin(frame * 3) * 10 * impact;

  const box: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    padding: "10px 26px",
    borderRadius: 18,
    fontFamily,
    fontWeight: 900,
    lineHeight: 1.05,
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  const s1 = slam(0);
  const s2 = slam(5);
  const s3 = spring({ frame: frame - 14, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ opacity: out, transform: `translateX(${shakeX}px)` }}>
      <div
        style={{
          ...box,
          top: 225,
          fontSize: 64,
          color: "black",
          backgroundColor: "white",
          transform: `translateX(-50%) scale(${interpolate(s1, [0, 1], [1.6, 1])})`,
        }}
      >
        {hook.top}
      </div>
      <div
        style={{
          ...box,
          top: 308,
          fontSize: 102,
          color: "black",
          backgroundColor: ACCENT,
          opacity: frame >= 5 ? 1 : 0,
          transform: `translateX(-50%) scale(${interpolate(s2, [0, 1], [2.2, 1])}) rotate(${-2 + wiggle}deg)`,
        }}
      >
        {hook.highlight}
      </div>
      {hook.sub && (
        <div
          style={{
            ...box,
            top: 470,
            fontSize: 46,
            fontWeight: 800,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.7)",
            opacity: s3,
            transform: `translateX(-50%) translateY(${interpolate(s3, [0, 1], [40, 0])}px)`,
          }}
        >
          {hook.sub}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- Sous-titres classiques (mots *mis en valeur* en jaune) ----------
const SubtitleLine: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 220 }, durationInFrames: 8 });
  const hl = spring({ frame: frame - 3, fps, config: { damping: 8, stiffness: 240 } });
  const out = interpolate(frame, [frames - 2, frames], [1, 0], clamp);
  const parts = text.split("*");
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 590 }}>
      <div
        style={{
          maxWidth: 920,
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
        {parts.map((p, i) =>
          i % 2 === 1 ? (
            <span key={i} style={{ color: ACCENT, display: "inline-block", margin: "0 0.06em", transform: `scale(${interpolate(hl, [0, 1], [1.5, 1.08])}) rotate(-2deg)` }}>
              {p}
            </span>
          ) : (
            <span key={i}>{p}</span>
          ),
        )}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Appel à l'action ----------
const Cta: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 9, stiffness: 200 } });
  const pulse = frame > 15 ? 1 + Math.max(0, Math.sin((frame - 15) / 4)) * 0.05 : 1;
  const arrow = Math.abs(Math.sin(frame / 5)) * 22;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300 }}>
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
          transform: `scale(${pop * pulse}) rotate(-2deg)`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        {text}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily,
          fontWeight: 900,
          fontSize: 80,
          color: "white",
          WebkitTextStroke: "8px black",
          paintOrder: "stroke fill",
          opacity: pop,
          transform: `translateY(${arrow}px)`,
        }}
      >
        ↓
      </div>
    </AbsoluteFill>
  );
};

// ---------- Composition complète ----------
export const TikTokEdit: React.FC<{ edit: VideoEdit; music: string }> = ({ edit, music }) => {
  const frame = useCurrentFrame();
  const clips = placeClips(edit.clips);
  const last = clips[clips.length - 1];
  const callouts = (edit.callouts ?? []).flatMap((c) => {
    const from = toOutputFrame(clips, c.at);
    return from === null ? [] : [{ c, from, frames: f(c.dur) }];
  });

  // tremblements cumulés
  const shake = callouts
    .filter((x) => x.c.type === "shake")
    .map((x) => shakeOffset(frame, x.from, x.frames))
    .reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y, r: a.r + b.r }), { x: 0, y: 0, r: 0 });

  // progression sur la ligne de parcours (interpolée entre les points de repère)
  const cps = (edit.route?.checkpoints ?? []).flatMap((cp) => {
    const fr = toOutputFrame(clips, cp.at);
    return fr === null ? [] : [{ fr, km: cp.km }];
  });
  const routeKm = cps.length >= 2 ? interpolate(frame, cps.map((c) => c.fr), cps.map((c) => c.km), clamp) : 0;
  const finishFrame = cps.length ? cps[cps.length - 1].fr : 0;

  // volume de la musique : bas sous la voix, fort sur les paysages
  const musicVolume = (fr: number) => {
    const c = clips.find((cl) => fr >= cl.from && fr < cl.from + cl.frames) ?? last;
    const target = c.kind === "talk" ? MUSIC_TALK : MUSIC_BROLL;
    const prev = clips[clips.indexOf(c) - 1];
    if (prev) {
      const prevTarget = prev.kind === "talk" ? MUSIC_TALK : MUSIC_BROLL;
      return interpolate(fr, [c.from, c.from + 5], [prevTarget, target], clamp);
    }
    return target;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.r}deg)` }}>
        {clips.map((c, i) => {
          const next = clips[i + 1];
          // le plan continue sous le suivant pendant son fondu d'entrée
          const extend = next && next.kind === "broll" ? XF : 0;
          const prev = clips[i - 1];
          const fadeIn = c.kind === "broll" && !!prev;
          return (
            <Sequence key={i} from={c.from} durationInFrames={c.frames + extend} premountFor={30}>
              <ClipView clip={c} src={edit.src} fadeIn={fadeIn} extend={extend} />
            </Sequence>
          );
        })}
      </AbsoluteFill>

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

      {callouts.map(({ c, from, frames }, i) => {
        if (c.type === "shake") return null;
        return (
          <Sequence key={`co-${i}`} from={from} durationInFrames={frames}>
            {c.type === "slam" && <Slam words={c.words} frames={frames} />}
            {c.type === "counter" && <Counter value={c.value} unit={c.unit} label={c.label} frames={frames} />}
            {c.type === "progress" && <Progress done={c.done} total={c.total} unit={c.unit} frames={frames} />}
          </Sequence>
        );
      })}

      <Sequence durationInFrames={f(edit.hook.duration)}>
        <Hook hook={edit.hook} />
      </Sequence>

      {edit.cta && (
        <Sequence from={last.from + 18} durationInFrames={last.frames - 18}>
          <Cta text={edit.cta} />
        </Sequence>
      )}

      {edit.route && (
        <Circuit
          progress={routeKm / edit.route.totalKm}
          km={routeKm}
          totalKm={edit.route.totalKm}
          finishFrame={finishFrame}
          hideFrom={last.from + 10}
        />
      )}
      <Audio src={staticFile(music)} volume={musicVolume} />
    </AbsoluteFill>
  );
};
