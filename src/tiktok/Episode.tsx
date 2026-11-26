// Épisode de la série « premier trail » (format validé par Quentin sur J-17, 20/11/2026).
// Style naturel : voix = piste unique montée à l'échantillon près (voice.wav), visage synchronisé
// sur chaque phrase, plans d'ambiance muets par-dessus, « J-X » seul texte de hook,
// sous-titres simples sans animation, logo « + S'abonner » sur la dernière phrase. Aucun bruitage.
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type EpisodeData = {
  hook: string;
  voice: string;
  pieces: readonly { src: string; srcIn: number; start: number; dur: number }[];
  shots: readonly (readonly [number, number, string])[];
  subs: readonly (readonly [number, number, string])[];
  voiceEnd: number;
  tail: number;
  badgeAt: number;
  strava?: { start: number; end: number; dist: string; dplus: string; time: string; trace: string };
};
export const episodeFrames = (ep: EpisodeData) => f(ep.voiceEnd + ep.tail);

const shadow = "0 0 3px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.55)";
const textStyle = { fontFamily: NEUTRE.font, color: "white", textShadow: shadow, textAlign: "center" as const };
const cover = { width: "100%", height: "100%", objectFit: "cover" as const };

const FollowBadge: React.FC = () => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [0, 8], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 330 }}>{/* en haut : ne cache pas le visage */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 999, padding: "14px 34px 14px 16px", boxShadow: "0 8px 26px rgba(0,0,0,0.3)", opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#FE2C55", color: "white", fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 52, lineHeight: "64px", textAlign: "center" }}>+</div>
        <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 44, color: "#161823" }}>S’abonner</div>
      </div>
    </AbsoluteFill>
  );
};

// Résultat Strava posé sur un plan de course (pas d'écran noir) : tracé + 3 chiffres
const StravaStats: React.FC<{ s: NonNullable<EpisodeData["strava"]> }> = ({ s }) => {
  const fr = useCurrentFrame();
  const o = interpolate(fr, [0, 6], [0, 1], clamp);
  const stat = (label: string, value: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ ...textStyle, fontWeight: 600, fontSize: 30 }}>{label}</div>
      <div style={{ ...textStyle, fontWeight: 800, fontSize: 62, lineHeight: 1.05 }}>{value}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)" }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, gap: 24 }}>
        <Img src={staticFile(s.trace)} style={{ height: 300, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }} />
        <div style={{ display: "flex", gap: 56 }}>
          {stat("Distance", s.dist)}
          {stat("D+", s.dplus)}
          {stat("Temps", s.time)}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Episode: React.FC<{ ep: EpisodeData }> = ({ ep }) => {
  const total = episodeFrames(ep);
  const EndFade: React.FC = () => {
    const fr = useCurrentFrame();
    return <AbsoluteFill style={{ backgroundColor: "black", opacity: interpolate(fr, [total - 10, total], [0, 1], clamp) }} />;
  };
  const last = ep.pieces[ep.pieces.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* visage synchronisé sur chaque phrase (le dernier plan reste à l'image pendant la fin) */}
      {ep.pieces.map((p, i) => {
        const isLast = i === ep.pieces.length - 1;
        const from = f(p.start);
        const dur = (isLast ? total : f(ep.pieces[i + 1].start)) - from;
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(1, dur)} premountFor={30}>
            <OffthreadVideo src={staticFile(p.src)} muted trimBefore={f(p.srcIn)} style={cover} />
          </Sequence>
        );
      })}
      {/* plans d'ambiance muets */}
      {ep.shots.map(([a, b, src], i) => (
        <Sequence key={`s${i}`} from={f(a)} durationInFrames={Math.max(1, f(b) - f(a))} premountFor={30}>
          <OffthreadVideo src={staticFile(src)} muted style={cover} />
        </Sequence>
      ))}

      <Audio src={staticFile(ep.voice)} />

      <Sequence from={0} durationInFrames={f(ep.pieces[1].start)}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
          <div style={{ ...textStyle, fontWeight: 800, fontSize: 110 }}>{ep.hook}</div>
        </AbsoluteFill>
      </Sequence>

      {ep.strava ? (
        <Sequence from={f(ep.strava.start)} durationInFrames={f(ep.strava.end) - f(ep.strava.start)}>
          <StravaStats s={ep.strava} />
        </Sequence>
      ) : null}

      {ep.subs.map(([a, b, t], i) => (
        <Sequence key={`t${i}`} from={f(a)} durationInFrames={Math.max(1, f(b) - f(a))}>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380 }}>
            <div style={{ ...textStyle, maxWidth: 900, fontWeight: 700, fontSize: 54, lineHeight: 1.2 }}>{t}</div>
          </AbsoluteFill>
        </Sequence>
      ))}

      <Sequence from={f(ep.badgeAt)} durationInFrames={total - f(ep.badgeAt)}>
        <FollowBadge />
      </Sequence>
      <EndFade />
      {last ? null : null}
    </AbsoluteFill>
  );
};
