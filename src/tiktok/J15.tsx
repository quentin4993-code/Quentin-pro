// J-15 — 10 km en 4 blocs de 15 min. Même style que la série (voix nettoyée, visage + plans muets,
// « J-15 », sous-titres simples, aucun bruitage), + allures de chaque bloc (temps intermédiaires
// Strava : allure + vitesse) affichées pendant le bloc, + résultat Strava posé sur le dernier plan.
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";
import { J15D } from "./j15.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const J15_FRAMES = f(J15D.end);

const shadow = "0 0 3px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.55)";
const txt = { fontFamily: NEUTRE.font, color: "white", textShadow: shadow };
const cover = { width: "100%", height: "100%", objectFit: "cover" as const };

// Allures du bloc : texte blanc simple, colonnes alignées, apparition en fondu court
const Stats: React.FC<{ title: string; rows: readonly (readonly string[])[] }> = ({ title, rows }) => {
  const fr = useCurrentFrame();
  const o = interpolate(fr, [0, 6], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 240, opacity: o }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "22px 34px", borderRadius: 26, backgroundColor: "rgba(0,0,0,0.28)" }}>
        <div style={{ ...txt, fontWeight: 800, fontSize: 54 }}>{title}</div>
        {rows.map(([k, pace, speed], i) => (
          <div key={i} style={{ display: "flex", gap: 34, alignItems: "baseline", fontVariantNumeric: "tabular-nums" }}>
            <div style={{ ...txt, fontWeight: 600, fontSize: 40, width: 150, textAlign: "right" }}>{k}</div>
            <div style={{ ...txt, fontWeight: 800, fontSize: 50, width: 230 }}>{pace}</div>
            <div style={{ ...txt, fontWeight: 600, fontSize: 40, width: 220, opacity: 0.95 }}>{speed}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const StravaEnd: React.FC = () => {
  const s = J15D.strava;
  const stat = (label: string, value: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ ...txt, fontWeight: 600, fontSize: 30 }}>{label}</div>
      <div style={{ ...txt, fontWeight: 800, fontSize: 62, lineHeight: 1.05 }}>{value}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, gap: 22 }}>
      <Img src={staticFile(s.trace)} style={{ height: 300, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }} />
      <div style={{ display: "flex", gap: 52 }}>
        {stat("Distance", s.dist)}
        {stat("Allure", s.pace)}
        {stat("Temps", s.time)}
      </div>
    </AbsoluteFill>
  );
};

const FollowBadge: React.FC = () => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [0, 8], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 420 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 999, padding: "14px 34px 14px 16px", boxShadow: "0 8px 26px rgba(0,0,0,0.3)", opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#FE2C55", color: "white", fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 52, lineHeight: "64px", textAlign: "center" }}>+</div>
        <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 44, color: "#161823" }}>S’abonner</div>
      </div>
    </AbsoluteFill>
  );
};

export const J15: React.FC = () => {
  const EndFade: React.FC = () => {
    const fr = useCurrentFrame();
    return <AbsoluteFill style={{ backgroundColor: "black", opacity: interpolate(fr, [J15_FRAMES - 10, J15_FRAMES], [0, 1], clamp) }} />;
  };
  const segs = J15D.segs;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {segs.map((s, i) => {
        const from = f(s.start);
        const to = i + 1 < segs.length ? f(segs[i + 1].start) : J15_FRAMES;
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(1, to - from)} premountFor={30}>
            <OffthreadVideo src={staticFile(s.src)} muted trimBefore={f(s.srcIn)} style={cover} />
          </Sequence>
        );
      })}
      <Audio src={staticFile(J15D.voice)} />

      <Sequence from={0} durationInFrames={f(segs[1].start)}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
          <div style={{ ...txt, fontWeight: 800, fontSize: 110 }}>{J15D.hook}</div>
        </AbsoluteFill>
      </Sequence>

      {J15D.stats.map(([a, b, title, rows], i) => (
        <Sequence key={`st${i}`} from={f(a)} durationInFrames={f(b) - f(a)}>
          <Stats title={title} rows={rows} />
        </Sequence>
      ))}

      <Sequence from={f(J15D.strava.start)} durationInFrames={J15_FRAMES - f(J15D.strava.start)}>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 50%)" }} />
        <StravaEnd />
      </Sequence>

      {J15D.subs.map(([a, b, t], i) => (
        <Sequence key={`t${i}`} from={f(a)} durationInFrames={Math.max(1, f(b) - f(a))}>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380 }}>
            <div style={{ ...txt, textAlign: "center", maxWidth: 900, fontWeight: 700, fontSize: 54, lineHeight: 1.2 }}>{t}</div>
          </AbsoluteFill>
        </Sequence>
      ))}

      <Sequence from={f(J15D.badgeAt)} durationInFrames={J15_FRAMES - f(J15D.badgeAt)}>
        <FollowBadge />
      </Sequence>
      <EndFade />
    </AbsoluteFill>
  );
};
