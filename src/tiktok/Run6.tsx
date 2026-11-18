// Jour 6/22 — premier run social à Saint-Paul. Montage SOBRE demandé : coupes sur les blancs,
// paroles laissées telles quelles, sous-titres classiques, fondus doux sur les plans d'ambiance (son coupé), pas de musique.
// Photo de fin dézoomée (toute la photo visible, fond flouté) : public/videos/run6/photo.jpg.
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";
import { R6_CLIPS, R6_END, R6_PHOTO, R6_SUBS, R6_VOICE_END } from "./run6.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const R6_FRAMES = f(R6_END);
const FADE = 6;

const Clip: React.FC<{ src: string; frames: number; fade: boolean; vol: number }> = ({ src, frames, fade, vol }) => {
  const fr = useCurrentFrame();
  const o = fade ? interpolate(fr, [0, FADE], [0, 1], clamp) : 1;
  const v = fade ? interpolate(fr, [0, FADE, frames - FADE, frames], [0, vol, vol, 0], clamp) : vol;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <OffthreadVideo src={staticFile(src)} volume={v} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

const Sub: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const fr = useCurrentFrame();
  const o = Math.min(interpolate(fr, [0, 3], [0, 1], clamp), interpolate(fr, [frames - 2, frames], [1, 0], clamp));
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 330 }}>
      <div style={{ maxWidth: 920, textAlign: "center", fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 58, lineHeight: 1.18, color: "white", textShadow: "0 0 4px rgba(0,0,0,0.85), 0 3px 14px rgba(0,0,0,0.6)", opacity: o }}>{text}</div>
    </AbsoluteFill>
  );
};

const Pill: React.FC<{ text: string; frames: number; top: number }> = ({ text, frames, top }) => {
  const fr = useCurrentFrame();
  const o = Math.min(interpolate(fr, [0, 10], [0, 1], clamp), interpolate(fr, [frames - 10, frames], [1, 0], clamp));
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: top }}>
      <div style={{ fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 40, color: NEUTRE.brown, backgroundColor: NEUTRE.beigeT, padding: "12px 30px", borderRadius: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.22)", opacity: o, transform: `translateY(${(1 - o) * -10}px)` }}>{text}</div>
    </AbsoluteFill>
  );
};

const Photo: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const o = interpolate(fr, [0, FADE], [0, 1], clamp);
  const cta = interpolate(fr, [18, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Img src={staticFile("videos/run6/photo.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        <div style={{ fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 46, color: NEUTRE.brown, backgroundColor: NEUTRE.beigeT, padding: "14px 36px", borderRadius: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", opacity: cta }}>Abonne-toi pour la suite</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Run6: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    {R6_CLIPS.map((c, i) => {
      const frames = f(c.start + c.dur) - f(c.start);
      return (
        <Sequence key={i} from={f(c.start)} durationInFrames={frames} premountFor={30}>
          <Clip src={c.src} frames={frames} fade={c.fade} vol={c.vol} />
        </Sequence>
      );
    })}
    <Sequence from={f(R6_PHOTO.start)} durationInFrames={R6_FRAMES - f(R6_PHOTO.start)}>
      <Photo frames={R6_FRAMES - f(R6_PHOTO.start)} />
    </Sequence>

    <Sequence from={0} durationInFrames={f(3.6)}>
      <Pill text="Jour 6/22 · prépa 1er trail" frames={f(3.6)} top={210} />
    </Sequence>
    <Sequence from={f(R6_VOICE_END + 0.3)} durationInFrames={f(3)}>
      <Pill text="Run social · 1re édition" frames={f(3)} top={210} />
    </Sequence>

    {R6_SUBS.map(([a, b, t], i) => (
      <Sequence key={i} from={f(a)} durationInFrames={Math.max(1, f(b) - f(a))}>
        <Sub text={t} frames={Math.max(1, f(b) - f(a))} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
