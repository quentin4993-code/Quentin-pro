// « Courir lentement pour progresser » — vidéo Communauté au bureau, DA sobre.
// Cadrage : tête basse, mur libre en haut → schémas EN HAUT, sous-titres juste au-dessus de la tête.
import { AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";
import { ARM, HEART } from "./icons2";
import { LT_CLIPS, LT_END, LT_EV, LT_SEC, LT_SUBS } from "./lent.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BLUE = NEUTRE.blue;
const BROWN = NEUTRE.brown;
const shadow = "0 0 3px rgba(0,0,0,0.75), 0 2px 12px rgba(0,0,0,0.5)";
const CARD_TOP = 190;

export const LT_FRAMES = f(LT_END);
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
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 1100 }}>
      <div style={{ maxWidth: 980, textAlign: "center", fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 44, lineHeight: 1.2, color: "white", textShadow: shadow, opacity: o }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Hook « punch » : arrivée choc, texte au rythme de la voix, LENTEMENT qui claque ----------
// temps (s) dans la vidéo finale : chaque bloc arrive quand le mot est prononcé
export const HOOK_CHUNKS: [number, string][] = [
  [0.0, "POUR ALLER"],
  [1.01, "PLUS VITE"],
  [1.91, "EN TRAIL,"],
  [3.31, "IL FAUT COURIR…"],
];
const Hook: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const L = f(LT_EV.lentement);
  const out = interpolate(fr, [frames - 4, frames], [1, 0], clamp);
  const before = interpolate(fr, [L - 2, L + 1], [1, 0], clamp); // les blocs s'effacent quand LENTEMENT arrive
  const slam = interpolate(fr, [L, L + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  const spread = interpolate(fr, [L + 5, frames], [0, 1], clamp); // les lettres s'écartent lentement
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, opacity: before }}>
        {HOOK_CHUNKS.map(([t, txt], i) => {
          const s0 = f(t);
          if (fr < s0) return null;
          const p = i === 0 ? interpolate(fr, [0, 4], [0.75, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }) : interpolate(fr, [s0, s0 + 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
          const last = i === HOOK_CHUNKS.length - 1;
          return (
            <div
              key={i}
              style={{
                fontFamily: NEUTRE.font,
                fontWeight: 800,
                fontSize: last ? 92 : 112,
                lineHeight: 1.08,
                color: i === 1 ? NEUTRE.beige : "white",
                textShadow: "0 4px 22px rgba(0,0,0,0.55)",
                transform: `scale(${interpolate(p, [0, 1], [1.6, 1])})`,
                opacity: Math.min(1, p * 2),
              }}
            >
              {txt}
            </div>
          );
        })}
      </AbsoluteFill>
      {/* LENTEMENT : assombrissement + mot qui claque, puis lettres qui s'écartent */}
      <AbsoluteFill style={{ backgroundColor: "black", opacity: 0.5 * slam }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 520 }}>
        <div
          style={{
            fontFamily: NEUTRE.font,
            fontWeight: 900,
            fontSize: 136,
            letterSpacing: interpolate(spread, [0, 1], [0, 5]),
            color: "white",
            textShadow: "0 6px 30px rgba(0,0,0,0.6)",
            opacity: Math.min(1, slam * 2),
            transform: `scale(${interpolate(slam, [0, 1], [2.4, 1])})`,
          }}
        >
          LENTEMENT
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// mouvement de caméra du hook uniquement : arrivée (recul rapide) puis avancée sur « lentement »
const hookScale = (fr: number) => {
  const L = f(LT_EV.lentement);
  const arrive = interpolate(fr, [0, 7], [1.28, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const push = interpolate(fr, [L, L + 4], [1, 1.14], { ...clamp, easing: Easing.out(Easing.cubic) });
  return arrive * push;
};

const HookCam: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fr = useCurrentFrame();
  return <AbsoluteFill style={{ transform: `scale(${hookScale(fr)})`, transformOrigin: "50% 58%" }}>{children}</AbsoluteFill>;
};

// ---------- Pastille « le secret » ----------
const Secret: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const a = Math.min(interpolate(fr, [0, 8], [0, 1], clamp), interpolate(fr, [frames - 6, frames], [1, 0], clamp));
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 330 }}>
      <div style={{ fontFamily: NEUTRE.font, fontWeight: 700, fontSize: 52, color: BROWN, backgroundColor: NEUTRE.beigeT, padding: "16px 40px", borderRadius: 999, opacity: a, transform: `translateY(${(1 - a) * -14}px)`, boxShadow: "0 10px 26px rgba(0,0,0,0.15)" }}>
        Le secret des coureurs qui progressent
      </div>
    </AbsoluteFill>
  );
};

// ---------- Barre 80 / 20 ----------
const Bar: React.FC<{ fill80: number; fill20: number; hi20: number }> = ({ fill80, fill20, hi20 }) => {
  const W = 840;
  return (
    <div style={{ position: "relative", width: W, height: 92, borderRadius: 20, backgroundColor: "rgba(78,59,44,0.1)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: W * 0.8 * fill80, backgroundColor: BLUE, opacity: 1 - 0.55 * hi20 }} />
      <div style={{ position: "absolute", left: W * 0.8, top: 0, bottom: 0, width: W * 0.2 * fill20, backgroundColor: BROWN, opacity: 0.35 + 0.65 * hi20 }} />
      <div style={{ position: "absolute", left: 26, top: 0, bottom: 0, display: "flex", alignItems: "center", color: "white", fontWeight: 800, fontSize: 40, opacity: fill80 }}>80 % très facile</div>
      <div style={{ position: "absolute", left: W * 0.8, width: W * 0.2, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 36, opacity: fill20 }}>20 %</div>
    </div>
  );
};

const PctCard: React.FC = () => (
  <Card from={LT_SEC.pct[0]} to={LT_SEC.pct[1]} height={400}>
    {(fr) => {
      const fill80 = interpolate(fr, [f(LT_EV.pct80), f(LT_EV.pct80) + 18], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
      const fill20 = ease(fr, LT_EV.facile, 12);
      const ef = ease(fr, LT_EV.fondamentale);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
          <div style={{ fontWeight: 700, fontSize: 40, opacity: 0.7 }}>Tes entraînements</div>
          <Bar fill80={fill80} fill20={fill20} hi20={0} />
          <div style={{ fontWeight: 800, fontSize: 54, color: BLUE, opacity: ef, transform: `translateY(${(1 - ef) * 12}px)` }}>= endurance fondamentale</div>
        </div>
      );
    }}
  </Card>
);

// ---------- Test de la parole ----------
const Bubble: React.FC<{ p: number; ok: boolean; children: React.ReactNode }> = ({ p, ok, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * (ok ? -20 : 20)}px)` }}>
    <div style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: ok ? BLUE : BROWN, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800, flexShrink: 0 }}>
      {ok ? "✓" : "✗"}
    </div>
    <div style={{ backgroundColor: "white", borderRadius: 26, padding: "16px 28px", fontWeight: 700, fontSize: 44, color: BROWN, boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}>{children}</div>
  </div>
);
const ParoleCard: React.FC = () => (
  <Card from={LT_SEC.parole[0]} to={LT_SEC.parole[1]} height={470}>
    {(fr) => {
      const a = ease(fr, LT_EV.parler, 10);
      const a2 = ease(fr, LT_EV.phrases);
      const b = ease(fr, LT_EV.essouffle, 10);
      const b2 = ease(fr, LT_EV.tropvite);
      return (
        <div style={{ padding: "40px 50px", display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ fontWeight: 700, fontSize: 42, opacity: 0.7 }}>Le test de la parole</div>
          <Bubble p={a} ok>
            Tu peux parler, chanter
            <span style={{ opacity: a2 }}>, faire des phrases</span>
          </Bubble>
          <Bubble p={b} ok={false}>
            Essoufflé&nbsp;? <span style={{ opacity: b2, color: BROWN }}>→ trop vite</span>
          </Bubble>
        </div>
      );
    }}
  </Card>
);

// ---------- Le moteur ----------
const MoteurCard: React.FC = () => (
  <Card from={LT_SEC.moteur[0]} to={LT_SEC.moteur[1]} height={440}>
    {(fr) => {
      const t = ease(fr, LT_EV.moteur);
      const m = ease(fr, LT_EV.muscles, 10);
      const c = ease(fr, LT_EV.coeur, 10);
      const beat = 1 + 0.06 * Math.max(0, Math.sin((fr - f(LT_EV.coeur)) / 3)) * (fr > f(LT_EV.coeur) ? 1 : 0);
      const Icon: React.FC<{ d: string; p: number; label: string; s?: number }> = ({ d, p, label, s = 1 }) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: p, transform: `scale(${(0.7 + 0.3 * p) * s})` }}>
          <svg width={150} height={150} viewBox="0 0 24 24">
            <path d={d} fill={BLUE} />
          </svg>
          <div style={{ fontWeight: 700, fontSize: 42 }}>{label}</div>
        </div>
      );
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
          <div style={{ fontWeight: 800, fontSize: 48, textAlign: "center", padding: "0 40px", lineHeight: 1.2, opacity: Math.max(0.35, t) }}>
            Courir lentement = construire
            <br />
            ton <span style={{ color: BLUE }}>moteur</span>
          </div>
          <div style={{ display: "flex", gap: 120 }}>
            <Icon d={ARM} p={m} label="tes muscles" />
            <Icon d={HEART} p={c} label="ton cœur" s={beat} />
          </div>
        </div>
      );
    }}
  </Card>
);

// ---------- Les 20 % ----------
const DurCard: React.FC = () => (
  <Card from={LT_SEC.dur[0]} to={LT_SEC.dur[1]} height={400}>
    {(fr) => {
      const hi = ease(fr, LT_EV.pct20, 12);
      const e = ease(fr, LT_EV.envoyer);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
          <div style={{ fontWeight: 700, fontSize: 40, opacity: 0.7 }}>Tes entraînements</div>
          <Bar fill80={1} fill20={1} hi20={hi} />
          <div style={{ fontWeight: 800, fontSize: 54, opacity: e, transform: `translateY(${(1 - e) * 12}px)` }}>
            20 % de séances dures : <span style={{ color: BROWN }}>tu envoies</span>
          </div>
        </div>
      );
    }}
  </Card>
);

// ---------- Fin ----------
const FinCard: React.FC = () => (
  <Card from={LT_SEC.question[0]} to={LT_END + 0.5} height={330}>
    {(fr) => {
      const c = ease(fr, LT_EV.fond);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 26 }}>
          <div style={{ fontWeight: 800, fontSize: 60, textAlign: "center" }}>
            Et toi : <span style={{ color: BLUE }}>lent</span> ou toujours <span style={{ color: BROWN }}>à fond</span>&nbsp;?
          </div>
          <div style={{ fontWeight: 600, fontSize: 40, color: "white", backgroundColor: BROWN, padding: "12px 30px", borderRadius: 999, opacity: c }}>Abonne-toi pour la suite</div>
        </div>
      );
    }}
  </Card>
);

const Sfx: React.FC<{ at: number; name: string; volume: number }> = ({ at, name, volume }) => (
  <Sequence from={f(at)} durationInFrames={40}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const Lent: React.FC<{ music?: boolean }> = ({ music = false }) => {
  let pos = 0;
  const placed = LT_CLIPS.map((c) => {
    const frames = f(c.out) - f(c.in);
    const p = { ...c, from: pos, frames };
    pos += frames;
    return p;
  });
  const E = LT_EV;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {placed.map((c, i) => (
        <Sequence key={i} from={c.from} durationInFrames={c.frames} premountFor={30}>
          {i === 0 ? (
            <HookCam>
              <OffthreadVideo src={staticFile(c.src)} trimBefore={f(c.in)} trimAfter={f(c.in) + c.frames} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </HookCam>
          ) : (
            <OffthreadVideo src={staticFile(c.src)} trimBefore={f(c.in)} trimAfter={f(c.in) + c.frames} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </Sequence>
      ))}

      <At from={0} to={LT_SEC.hook[1]}>
        <Hook frames={f(LT_SEC.hook[1])} />
      </At>
      <At from={LT_SEC.bizarre[0]} to={LT_SEC.bizarre[1]}>
        <Secret frames={f(LT_SEC.bizarre[1]) - f(LT_SEC.bizarre[0])} />
      </At>
      <At from={LT_SEC.pct[0]} to={LT_SEC.pct[1]}>
        <PctCard />
      </At>
      <At from={LT_SEC.parole[0]} to={LT_SEC.parole[1]}>
        <ParoleCard />
      </At>
      <At from={LT_SEC.moteur[0]} to={LT_SEC.moteur[1]}>
        <MoteurCard />
      </At>
      <At from={LT_SEC.dur[0]} to={LT_SEC.dur[1]}>
        <DurCard />
      </At>
      <At from={LT_SEC.question[0]} to={LT_END}>
        <FinCard />
      </At>

      {LT_SUBS.map(([a, b, t], i) => (
        <At key={i} from={a} to={b}>
          <Sub text={t} frames={f(b) - f(a)} />
        </At>
      ))}

      {/* hook : arrivée (whoosh + impact), un tic par bloc de texte, gros impact sur LENTEMENT */}
      <Sfx at={0} name="whoosh" volume={0.55} />
      <Sfx at={0.03} name="thud" volume={0.85} />
      {HOOK_CHUNKS.slice(1).map(([t], i) => (
        <Sfx key={`h${i}`} at={t} name="pop-hi" volume={0.5} />
      ))}
      <Sfx at={E.lentement - 0.12} name="whoosh" volume={0.45} />
      <Sfx at={E.lentement} name="thud" volume={1} />
      <Sfx at={E.lentement} name="pop-lo" volume={0.6} />
      <Sfx at={E.pct80} name="pop-hi" volume={0.4} />
      <Sfx at={E.fondamentale} name="pop-mid" volume={0.35} />
      <Sfx at={E.parler} name="pop-hi" volume={0.4} />
      <Sfx at={E.essouffle} name="pop-lo" volume={0.4} />
      <Sfx at={E.muscles} name="pop-hi" volume={0.4} />
      <Sfx at={E.coeur} name="pop-hi" volume={0.4} />
      <Sfx at={E.pct20} name="pop-lo" volume={0.4} />

      {music && <Audio src={staticFile("music/hotrock.mp3")} trimBefore={f(97)} volume={(fr) => interpolate(fr, [0, 10, pos - 30, pos], [0, 0.1, 0.1, 0], clamp)} />}
    </AbsoluteFill>
  );
};
