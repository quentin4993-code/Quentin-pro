// « Combien de fois par semaine courir quand on débute » — vidéo Communauté au bureau, DA sobre + hook « punch ».
// Cadrage : plafond libre en haut → schémas EN HAUT, sous-titres juste au-dessus de la tête.
import { AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";
import { SM_CLIPS, SM_END, SM_EV, SM_SEC, SM_SUBS } from "./semaine.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BLUE = NEUTRE.blue;
const BROWN = NEUTRE.brown;
const shadow = "0 0 3px rgba(0,0,0,0.75), 0 2px 12px rgba(0,0,0,0.5)";
const CARD_TOP = 160;

export const SM_FRAMES = f(SM_END);
const ease = (fr: number, t: number, d = 8) => interpolate(fr, [f(t), f(t) + d], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

const At: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => (
  <Sequence from={f(from)} durationInFrames={Math.max(1, f(to) - f(from))}>
    {children}
  </Sequence>
);

const Card: React.FC<{ from: number; to: number; height: number; children: (fr: number) => React.ReactNode }> = ({ from, to, height, children }) => {
  const local = useCurrentFrame();
  const fr = local + f(from);
  const a = Math.min(interpolate(local, [0, 8], [0, 1], clamp), interpolate(fr, [f(to) - 6, f(to)], [1, 0], clamp));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: CARD_TOP,
          width: 960,
          height,
          borderRadius: 34,
          backgroundColor: NEUTRE.beigeT,
          boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
          opacity: a,
          transform: `translateY(${(1 - a) * -20}px)`,
          fontFamily: NEUTRE.font,
          color: BROWN,
          overflow: "hidden",
        }}
      >
        {children(fr)}
      </div>
    </AbsoluteFill>
  );
};

const Sub: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const fr = useCurrentFrame();
  const o = Math.min(interpolate(fr, [0, 3], [0, 1], clamp), interpolate(fr, [frames - 2, frames], [1, 0], clamp));
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300 }}>
      <div style={{ maxWidth: 940, textAlign: "center", fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 60, lineHeight: 1.18, color: "white", textShadow: "0 0 4px rgba(0,0,0,0.85), 0 3px 14px rgba(0,0,0,0.6)", opacity: o }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Hook « punch » ----------
const CHUNKS: [number, string][] = [
  [0.0, "TU DÉBUTES ?"],
  [SM_EV.conseil, "UN CONSEIL :"],
];
const Hook: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const L = f(SM_EV.slam);
  const out = interpolate(fr, [frames - 4, frames], [1, 0], clamp);
  const before = interpolate(fr, [L - 2, L + 1], [1, 0], clamp);
  const slam = interpolate(fr, [L, L + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 250, opacity: before }}>
        {CHUNKS.map(([t, txt], i) => {
          const s0 = f(t);
          if (fr < s0) return null;
          const p = i === 0 ? interpolate(fr, [0, 4], [0.75, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }) : interpolate(fr, [s0, s0 + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
          return (
            <div key={i} style={{ fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 116, lineHeight: 1.1, color: i === 1 ? NEUTRE.beige : "white", textShadow: "0 4px 22px rgba(0,0,0,0.55)", transform: `scale(${interpolate(p, [0, 1], [1.6, 1])})`, opacity: Math.min(1, p * 2) }}>
              {txt}
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: 0.5 * slam }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 260 }}>
        <div style={{ textAlign: "center", fontFamily: NEUTRE.font, fontWeight: 900, fontSize: 118, lineHeight: 1.05, color: "white", textShadow: "0 6px 30px rgba(0,0,0,0.6)", opacity: Math.min(1, slam * 2), transform: `scale(${interpolate(slam, [0, 1], [2.2, 1])})` }}>
          NE COURS PAS
          <br />
          TOUS LES JOURS
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const hookScale = (fr: number) => {
  const L = f(SM_EV.slam);
  const arrive = interpolate(fr, [0, 7], [1.28, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const push = interpolate(fr, [L, L + 4], [1, 1.14], { ...clamp, easing: Easing.out(Easing.cubic) });
  return arrive * push;
};
const HookCam: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fr = useCurrentFrame();
  return <AbsoluteFill style={{ transform: `scale(${hookScale(fr)})`, transformOrigin: "50% 50%" }}>{children}</AbsoluteFill>;
};

// ---------- Le piège ----------
const Step: React.FC<{ p: number; text: string; color: string; last?: boolean }> = ({ p, text, color, last }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}>
    <div style={{ backgroundColor: color, color: "white", fontWeight: 800, fontSize: 38, padding: "12px 22px", borderRadius: 18, whiteSpace: "nowrap" }}>{text}</div>
    {!last && <div style={{ fontSize: 40, fontWeight: 800, color: BROWN, opacity: 0.6 }}>→</div>}
  </div>
);
const PiegeCard: React.FC = () => (
  <Card from={SM_SEC.piege[0]} to={SM_SEC.piege[1]} height={300}>
    {(fr) => (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
        <div style={{ fontWeight: 700, fontSize: 40, opacity: 0.7 }}>Le piège du débutant</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Step p={ease(fr, SM_EV.motive)} text="Super motivé" color={BLUE} />
          <Step p={ease(fr, SM_EV.vite)} text="Trop vite" color={BLUE} />
          <Step p={ease(fr, SM_EV.blesse)} text="Blessure ✗" color={BROWN} last />
        </div>
      </div>
    )}
  </Card>
);

// ---------- Les deux jauges ----------
const Gauge: React.FC<{ label: string; v: number; color: string; note: string; show: number }> = ({ label, v, color, note, show }) => (
  <div style={{ opacity: show, display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 40 }}>
      <span>{label}</span>
      <span style={{ color, fontSize: 34 }}>{note}</span>
    </div>
    <div style={{ height: 40, borderRadius: 20, backgroundColor: "rgba(78,59,44,0.12)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${v * 100}%`, backgroundColor: color, borderRadius: 20 }} />
    </div>
  </div>
);
const JaugesCard: React.FC = () => (
  <Card from={SM_SEC.jauges[0]} to={SM_SEC.jauges[1]} height={360}>
    {(fr) => {
      const souffle = interpolate(fr, [f(SM_EV.souffle), f(SM_EV.souffle) + 22], [0, 0.9], { ...clamp, easing: Easing.out(Easing.cubic) });
      const muscles = interpolate(fr, [f(SM_EV.artic), f(SM_EV.fin_jauges)], [0, 0.35], clamp);
      return (
        <div style={{ height: "100%", padding: "0 60px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
          <Gauge label="Ton souffle" v={souffle} color={BLUE} note="progresse vite" show={ease(fr, SM_EV.souffle)} />
          <Gauge label="Muscles & articulations" v={muscles} color={BROWN} note="plus lentement" show={ease(fr, SM_EV.artic)} />
        </div>
      );
    }}
  </Card>
);

// ---------- Semaine type ----------
const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const Week: React.FC<{ runs: number[]; added?: number; addP?: number; appear: number }> = ({ runs, added, addP = 0, appear }) => (
  <div style={{ display: "flex", gap: 16 }}>
    {DAYS.map((d, i) => {
      const run = runs.includes(i);
      const isAdd = added === i;
      const p = Math.min(1, Math.max(0, appear * 7 - i)); // les jours apparaissent un par un
      const bg = run ? BLUE : isAdd ? `rgba(62,106,158,${addP})` : "rgba(78,59,44,0.1)";
      return (
        <div key={i} style={{ width: 104, height: 128, borderRadius: 20, backgroundColor: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, opacity: p, transform: `scale(${isAdd ? 1 + 0.12 * Math.sin(Math.PI * addP) : 1})` }}>
          <div style={{ fontWeight: 800, fontSize: 40, color: run || addP > 0.5 && isAdd ? "white" : BROWN }}>{d}</div>
          <div style={{ fontWeight: 600, fontSize: 22, color: run || addP > 0.5 && isAdd ? "white" : BROWN, opacity: 0.85 }}>{run || (isAdd && addP > 0.5) ? "course" : "repos"}</div>
        </div>
      );
    })}
  </div>
);
const SemaineCard: React.FC = () => (
  <Card from={SM_SEC.semaine[0]} to={SM_SEC.semaine[1]} height={380}>
    {(fr) => {
      const appear = interpolate(fr, [f(SM_SEC.semaine[0]), f(SM_SEC.semaine[0]) + 16], [0, 1], clamp);
      const add = ease(fr, SM_EV.rajouter, 10);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
          <div style={{ fontWeight: 800, fontSize: 46 }}>
            Au début : <span style={{ color: BLUE }}>2 à 3 sorties</span> par semaine
          </div>
          <Week runs={[0, 2, 4]} added={6} addP={add} appear={appear} />
          <div style={{ fontWeight: 700, fontSize: 36, opacity: 0.75 }}>
            {add > 0.5 ? "Quand ça devient facile : + 1 séance" : "Un jour de repos entre chaque"}
          </div>
        </div>
      );
    }}
  </Card>
);

// ---------- Ma progression ----------
const MoiCard: React.FC = () => (
  <Card from={SM_SEC.moi[0]} to={SM_SEC.moi[1]} height={360}>
    {(fr) => {
      const steps: [number, number][] = [
        [SM_EV.deux, 2],
        [SM_EV.trois, 3],
        [SM_EV.quatre, 4],
        [SM_EV.cinq, 5],
      ];
      let n = 0;
      let pop = 0;
      steps.forEach(([t, v]) => {
        if (fr >= f(t)) {
          n = v;
          pop = 1 - interpolate(fr, [f(t), f(t) + 8], [0, 1], clamp);
        }
      });
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 40, opacity: 0.75 }}>Ma prépa trail</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, opacity: n ? 1 : 0.25 }}>
            <span style={{ fontWeight: 900, fontSize: 150, color: BLUE, lineHeight: 1, transform: `scale(${1 + 0.18 * pop})`, display: "inline-block" }}>{n || 2}</span>
            <span style={{ fontWeight: 700, fontSize: 46 }}>séances / semaine</span>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[2, 3, 4, 5].map((v) => (
              <div key={v} style={{ width: 70, height: 14, borderRadius: 7, backgroundColor: n >= v ? BLUE : "rgba(78,59,44,0.15)" }} />
            ))}
          </div>
        </div>
      );
    }}
  </Card>
);

// ---------- Fin ----------
const FinCard: React.FC = () => (
  <Card from={SM_SEC.question[0]} to={SM_END + 0.5} height={320}>
    {(fr) => (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 26 }}>
        <div style={{ fontWeight: 800, fontSize: 58, textAlign: "center", lineHeight: 1.15 }}>
          Et toi, tu cours combien
          <br />
          de fois par <span style={{ color: BLUE }}>semaine</span>&nbsp;?
        </div>
        <div style={{ fontWeight: 600, fontSize: 40, color: "white", backgroundColor: BROWN, padding: "12px 30px", borderRadius: 999, opacity: ease(fr, SM_EV.combien + 0.6) }}>Abonne-toi pour la suite</div>
      </div>
    )}
  </Card>
);

const Sfx: React.FC<{ at: number; name: string; volume: number }> = ({ at, name, volume }) => (
  <Sequence from={f(at)} durationInFrames={40}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const Semaine: React.FC<{ music?: boolean }> = ({ music = false }) => {
  let pos = 0;
  const placed = SM_CLIPS.map((c) => {
    const frames = f(c.out) - f(c.in);
    const p = { ...c, from: pos, frames };
    pos += frames;
    return p;
  });
  const E = SM_EV;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {placed.map((c, i) => {
        const v = <OffthreadVideo src={staticFile(c.src)} trimBefore={f(c.in)} trimAfter={f(c.in) + c.frames} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
        return (
          <Sequence key={i} from={c.from} durationInFrames={c.frames} premountFor={30}>
            {i === 0 ? <HookCam>{v}</HookCam> : v}
          </Sequence>
        );
      })}

      <At from={0} to={SM_SEC.hook[1]}>
        <Hook frames={f(SM_SEC.hook[1])} />
      </At>
      <At from={SM_SEC.piege[0]} to={SM_SEC.piege[1]}>
        <PiegeCard />
      </At>
      <At from={SM_SEC.jauges[0]} to={SM_SEC.jauges[1]}>
        <JaugesCard />
      </At>
      <At from={SM_SEC.semaine[0]} to={SM_SEC.semaine[1]}>
        <SemaineCard />
      </At>
      <At from={SM_SEC.moi[0]} to={SM_SEC.moi[1]}>
        <MoiCard />
      </At>
      <At from={SM_SEC.question[0]} to={SM_END}>
        <FinCard />
      </At>

      {SM_SUBS.map(([a, b, t], i) => (
        <At key={i} from={a} to={b}>
          <Sub text={t} frames={f(b) - f(a)} />
        </At>
      ))}

      {/* hook : arrivée + tic + gros impact */}
      <Sfx at={0} name="whoosh" volume={0.55} />
      <Sfx at={0.03} name="thud" volume={0.85} />
      <Sfx at={E.conseil} name="pop-hi" volume={0.5} />
      <Sfx at={E.slam - 0.12} name="whoosh" volume={0.45} />
      <Sfx at={E.slam} name="thud" volume={1} />
      <Sfx at={E.slam} name="pop-lo" volume={0.6} />
      {/* pops discrets */}
      <Sfx at={E.motive} name="pop-hi" volume={0.4} />
      <Sfx at={E.vite} name="pop-hi" volume={0.4} />
      <Sfx at={E.blesse} name="pop-lo" volume={0.45} />
      <Sfx at={E.souffle} name="pop-hi" volume={0.4} />
      <Sfx at={E.artic} name="pop-lo" volume={0.4} />
      <Sfx at={E.rajouter} name="pop-hi" volume={0.45} />
      {[E.deux, E.trois, E.quatre, E.cinq].map((t, i) => (
        <Sfx key={`n${i}`} at={t} name="pop-hi" volume={0.42} />
      ))}

      {music && <Audio src={staticFile("music/hotrock.mp3")} trimBefore={f(97)} volume={(fr) => interpolate(fr, [0, 10, pos - 30, pos], [0, 0.1, 0.1, 0], clamp)} />}
    </AbsoluteFill>
  );
};
