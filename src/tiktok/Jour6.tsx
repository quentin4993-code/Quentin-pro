// « Le dénivelé expliqué simplement » — vidéo Communauté au bureau, DA sobre (Inter, beige / marron / bleu).
// Les schémas sont en bas (sur le torse), les sous-titres sous le menton : le visage n'est jamais caché.
import { AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { NEUTRE } from "./neutre";
import { J6_CLIPS, J6_END, J6_EV, J6_SEC, J6_SUBS } from "./jour6.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BLUE = NEUTRE.blue;
const BROWN = NEUTRE.brown;
const shadow = "0 0 3px rgba(0,0,0,0.75), 0 2px 12px rgba(0,0,0,0.5)";

export const J6_FRAMES = f(J6_END);

// apparition douce à partir d'un temps absolu (secondes) ; `fr` = image courante absolue
const ease = (fr: number, t: number, d = 8) => interpolate(fr, [f(t), f(t) + d], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

const At: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => (
  <Sequence from={f(from)} durationInFrames={Math.max(1, f(to) - f(from))}>
    {children}
  </Sequence>
);

// ---------- Carte (zone basse) ----------
const Card: React.FC<{ from: number; to: number; children: (fr: number) => React.ReactNode; height?: number }> = ({ from, to, children, height = 500 }) => {
  const local = useCurrentFrame();
  const fr = local + f(from); // image absolue
  const a = Math.min(interpolate(local, [0, 8], [0, 1], clamp), interpolate(fr, [f(to) - 6, f(to)], [1, 0], clamp));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 1030,
          width: 960,
          height,
          borderRadius: 34,
          backgroundColor: NEUTRE.beigeT,
          boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
          opacity: a,
          transform: `translateY(${(1 - a) * 24}px)`,
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

// ---------- Sous-titres (sous le menton) ----------
const Sub: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const fr = useCurrentFrame();
  const o = Math.min(interpolate(fr, [0, 3], [0, 1], clamp), interpolate(fr, [frames - 2, frames], [1, 0], clamp));
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 925 }}>
      <div style={{ maxWidth: 980, textAlign: "center", fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 44, lineHeight: 1.2, color: "white", textShadow: shadow, opacity: o }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Hook ----------
const Hook: React.FC<{ frames: number }> = ({ frames }) => {
  const fr = useCurrentFrame();
  const out = interpolate(fr, [frames - 6, frames], [1, 0], clamp);
  const neq = 1; // visible dès la 1re image
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 1080, opacity: out }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28, fontFamily: NEUTRE.font, fontWeight: 800, fontSize: 140, color: "white", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
        <span>10 km</span>
        <span style={{ color: "white", opacity: neq, transform: `scale(${interpolate(neq, [0, 1], [1.4, 1])})` }}>≠</span>
        <span>10 km</span>
      </div>
      <div style={{ marginTop: 26, fontFamily: NEUTRE.font, fontWeight: 600, fontSize: 40, color: BROWN, backgroundColor: NEUTRE.beigeT, padding: "10px 28px", borderRadius: 999 }}>
        Le D+ expliqué simplement
      </div>
    </AbsoluteFill>
  );
};

// ---------- 1. Définition ----------
const DefCard: React.FC = () => (
  <Card from={J6_SEC.def[0]} to={J6_SEC.def[1]} height={420}>
    {(fr) => {
      const b = ease(fr, J6_EV.def_mots);
      const arrow = interpolate(fr, [f(J6_EV.def_mots), f(J6_EV.def_mots) + 20], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
      return (
        <div style={{ padding: "46px 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 30 }}>
            <span style={{ fontWeight: 800, fontSize: 150, color: BLUE, lineHeight: 1 }}>D+</span>
            <span style={{ fontWeight: 700, fontSize: 56 }}>= dénivelé positif</span>
          </div>
          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 26, opacity: b, transform: `translateY(${(1 - b) * 14}px)` }}>
            <svg width={90} height={110} viewBox="0 0 90 110">
              <path d="M45 105 L45 15" stroke={BLUE} strokeWidth={10} strokeLinecap="round" strokeDasharray="90" strokeDashoffset={90 * (1 - arrow)} />
              <path d="M18 40 L45 12 L72 40" fill="none" stroke={BLUE} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={arrow} />
            </svg>
            <span style={{ fontWeight: 600, fontSize: 52, lineHeight: 1.15 }}>
              tous les mètres que
              <br />
              tu montes pendant ta course
            </span>
          </div>
        </div>
      );
    }}
  </Card>
);

// ---------- 2 et 3. Profil du parcours : montées (D+) puis descentes (D–) ----------
const P: [number, number][] = [
  [0, 0],
  [1.6, 100],
  [2.4, 50],
  [4.4, 250],
  [5.4, 150],
  [7.2, 350],
  [10, 0],
];
const W = 840;
const H = 250;
const X = (km: number) => 60 + (km / 10) * W;
const Y = (alt: number) => 300 - (alt / 350) * H;
const seg = (i: number) => `M${X(P[i][0])} ${Y(P[i][1])} L${X(P[i + 1][0])} ${Y(P[i + 1][1])}`;
const segLen = (i: number) => Math.hypot(X(P[i + 1][0]) - X(P[i][0]), Y(P[i + 1][1]) - Y(P[i][1]));
const CLIMBS = [
  { i: 0, label: "+100 m", t: J6_EV.add_100, total: 100 },
  { i: 2, label: "+200 m", t: J6_EV.add_200a, total: 300 },
  { i: 4, label: "+200 m", t: J6_EV.add_200b, total: 500 },
];
const DESCENTS = [
  { i: 1, label: "−50 m", t: J6_EV.dm_desc },
  { i: 3, label: "−100 m", t: J6_EV.dm_desc + 0.3 },
  { i: 5, label: "−350 m", t: J6_EV.dm_desc + 0.6 },
];

const ProfileCard: React.FC = () => (
  <Card from={J6_SEC.add[0]} to={J6_SEC.dmoins[1]} height={520}>
    {(fr) => {
      const base = ease(fr, J6_SEC.add[0] + 0.1, 12);
      // compteur D+ : monte d'une marche à chaque montée annoncée
      let dplus = 0;
      CLIMBS.forEach((c, k) => {
        const prev = k === 0 ? 0 : CLIMBS[k - 1].total;
        dplus = fr >= f(c.t) ? prev + (c.total - prev) * ease(fr, c.t, 10) : dplus;
      });
      const final = ease(fr, J6_EV.add_500, 8);
      const dm = ease(fr, J6_EV.dm_mot, 8);
      const ends = ease(fr, J6_EV.dm_desc, 10);
      return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* compteurs */}
          <div style={{ position: "absolute", left: 50, top: 30, fontWeight: 800, fontSize: 56, color: BLUE, transform: `scale(${1 + 0.08 * Math.sin(Math.PI * Math.min(1, final))})`, transformOrigin: "left center" }}>
            D+ {Math.round(dplus)} m
          </div>
          <div style={{ position: "absolute", right: 50, top: 30, fontWeight: 800, fontSize: 56, color: BROWN, opacity: dm }}>D– 500 m</div>
          <svg width={960} height={520} viewBox="0 0 960 520" style={{ position: "absolute", left: 0, top: 110 }}>
            {/* sol */}
            <line x1={X(0)} y1={Y(0)} x2={X(10)} y2={Y(0)} stroke={BROWN} strokeOpacity={0.25} strokeWidth={2} strokeDasharray="6 8" />
            {/* parcours complet (discret) */}
            <polyline
              points={P.map(([k, a]) => `${X(k)},${Y(a)}`).join(" ")}
              fill="none"
              stroke={BROWN}
              strokeOpacity={0.3}
              strokeWidth={8}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={3000}
              strokeDashoffset={3000 * (1 - base)}
            />
            {/* montées */}
            {CLIMBS.map((c) => {
              const p = ease(fr, c.t, 10);
              const L = segLen(c.i);
              const mx = (X(P[c.i][0]) + X(P[c.i + 1][0])) / 2;
              const my = (Y(P[c.i][1]) + Y(P[c.i + 1][1])) / 2;
              return (
                <g key={c.i}>
                  <path d={seg(c.i)} stroke={BLUE} strokeWidth={12} strokeLinecap="round" fill="none" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
                  <text x={X(P[c.i + 1][0])} y={Y(P[c.i + 1][1]) - 22} textAnchor="middle" fontFamily={NEUTRE.font} fontWeight={800} fontSize={34} fill={BLUE} opacity={p}>
                    {c.label}
                  </text>
                </g>
              );
            })}
            {/* descentes */}
            {DESCENTS.map((d) => {
              const p = ease(fr, d.t, 10);
              const L = segLen(d.i);
              const mx = (X(P[d.i][0]) + X(P[d.i + 1][0])) / 2;
              const my = (Y(P[d.i][1]) + Y(P[d.i + 1][1])) / 2;
              return (
                <g key={d.i}>
                  <path d={seg(d.i)} stroke={BROWN} strokeWidth={12} strokeLinecap="round" fill="none" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
                  <text x={d.i === 5 ? mx + 52 : X(P[d.i + 1][0])} y={d.i === 5 ? my - 14 : Y(P[d.i + 1][1]) + 44} textAnchor="middle" fontFamily={NEUTRE.font} fontWeight={800} fontSize={30} fill={BROWN} opacity={p}>
                    {d.label}
                  </text>
                </g>
              );
            })}
            {/* départ / arrivée au même niveau */}
            <g opacity={ends}>
              <circle cx={X(0)} cy={Y(0)} r={11} fill={BROWN} />
              <circle cx={X(10)} cy={Y(0)} r={11} fill={BROWN} />
              <text x={X(0)} y={Y(0) + 46} textAnchor="start" fontFamily={NEUTRE.font} fontWeight={700} fontSize={28} fill={BROWN}>
                Départ
              </text>
              <text x={X(10)} y={Y(0) + 46} textAnchor="end" fontFamily={NEUTRE.font} fontWeight={700} fontSize={28} fill={BROWN}>
                Arrivée
              </text>
            </g>
            <text x={X(5)} y={Y(0) + 46} textAnchor="middle" fontFamily={NEUTRE.font} fontWeight={600} fontSize={28} fill={BROWN} opacity={0.6 * base}>
              10 km
            </text>
          </svg>
        </div>
      );
    }}
  </Card>
);

// ---------- 4. 170 étages ----------
const EtagesCard: React.FC = () => (
  <Card from={J6_SEC.etages[0]} to={J6_SEC.etages[1]} height={500}>
    {(fr) => {
      const a = ease(fr, J6_EV.et_500);
      const b = ease(fr, J6_EV.et_170);
      const fill = interpolate(fr, [f(J6_EV.et_170 - 1.4), f(J6_EV.et_fin)], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
      const floors = Math.round(170 * fill);
      const BH = 400;
      return (
        <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 56px", gap: 56 }}>
          <svg width={170} height={BH + 20} viewBox={`0 0 170 ${BH + 20}`}>
            <rect x={20} y={10} width={130} height={BH} rx={8} fill="none" stroke={BROWN} strokeOpacity={0.4} strokeWidth={4} />
            <rect x={22} y={10 + BH * (1 - fill)} width={126} height={BH * fill} rx={6} fill={BLUE} opacity={0.85} />
            {Array.from({ length: 17 }).map((_, i) => (
              <line key={i} x1={22} x2={148} y1={10 + (BH / 17) * (i + 1)} y2={10 + (BH / 17) * (i + 1)} stroke="white" strokeOpacity={0.5} strokeWidth={2} />
            ))}
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: 56, opacity: a, transform: `translateY(${(1 - a) * 12}px)` }}>500 m de D+</div>
            <div style={{ fontWeight: 800, fontSize: 92, color: BLUE, marginTop: 12, opacity: b }}>
              ≈ {floors} étages
            </div>
            <div style={{ fontWeight: 500, fontSize: 36, marginTop: 10, opacity: 0.7 * b }}>(environ 3 m par étage)</div>
          </div>
        </div>
      );
    }}
  </Card>
);

// ---------- 5. La règle ----------
const RegleCard: React.FC = () => (
  <Card from={J6_SEC.regle[0]} to={J6_SEC.regle[1]} height={380}>
    {(fr) => {
      const a = ease(fr, J6_EV.rg_100);
      const b = ease(fr, J6_EV.rg_1km);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontWeight: 600, fontSize: 36, opacity: 0.7, marginBottom: 18 }}>La règle des traileurs</div>
          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <span style={{ fontWeight: 800, fontSize: 76, opacity: a, transform: `translateY(${(1 - a) * 12}px)` }}>100 m de D+</span>
            <span style={{ fontWeight: 800, fontSize: 76, opacity: b }}>≈</span>
            <span style={{ fontWeight: 800, fontSize: 76, color: BLUE, opacity: b, transform: `translateY(${(1 - b) * 12}px)` }}>+1 km</span>
          </div>
          <div style={{ fontWeight: 500, fontSize: 36, marginTop: 16, opacity: 0.7 * b }}>de course en plus (environ)</div>
        </div>
      );
    }}
  </Card>
);

// ---------- 6. Le calcul ----------
const CalculCard: React.FC = () => (
  <Card from={J6_SEC.calcul[0]} to={J6_SEC.calcul[1]} height={420}>
    {(fr) => {
      const a = ease(fr, J6_EV.ca_10);
      const b = ease(fr, J6_EV.ca_500);
      const c = ease(fr, J6_EV.ca_15);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 30, fontWeight: 800, fontSize: 80 }}>
            <span style={{ opacity: a }}>10 km</span>
            <span style={{ opacity: b }}>+</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: b }}>
              <span>500 m D+</span>
              <span style={{ fontSize: 36, fontWeight: 600, opacity: 0.7, marginTop: 4 }}>≈ +5 km</span>
            </div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 84, color: BLUE, opacity: c, transform: `scale(${interpolate(c, [0, 1], [0.9, 1])})` }}>≈ 15 km à plat</div>
        </div>
      );
    }}
  </Card>
);

// ---------- 7. Le conseil ----------
const Check: React.FC<{ p: number; text: string }> = ({ p, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * 16}px)` }}>
    <svg width={70} height={70} viewBox="0 0 70 70">
      <rect x={4} y={4} width={62} height={62} rx={14} fill="none" stroke={BROWN} strokeWidth={5} strokeOpacity={0.5} />
      <path d="M18 36 L30 48 L53 22" fill="none" stroke={BLUE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={60} strokeDashoffset={60 * (1 - p)} />
    </svg>
    <span style={{ fontWeight: 700, fontSize: 60 }}>{text}</span>
  </div>
);
const ConseilCard: React.FC = () => (
  <Card from={J6_SEC.conseil[0]} to={J6_SEC.conseil[1]} height={420}>
    {(fr) => (
      <div style={{ padding: "48px 70px", display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ fontWeight: 700, fontSize: 46, opacity: 0.75 }}>Avant de t'inscrire, regarde :</div>
        <Check p={ease(fr, J6_EV.co_km, 10)} text="les kilomètres" />
        <Check p={ease(fr, J6_EV.co_dplus, 10)} text="le D+" />
      </div>
    )}
  </Card>
);

// ---------- 8. Question + fin ----------
const FinCard: React.FC = () => (
  <Card from={J6_SEC.question[0]} to={J6_END + 0.5} height={330}>
    {(fr) => {
      const c = ease(fr, J6_SEC.question[0] + 0.9);
      return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 26 }}>
          <div style={{ fontWeight: 800, fontSize: 62, textAlign: "center" }}>
            Et toi, ton plus gros <span style={{ color: BLUE }}>D+</span>&nbsp;?
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

export const Jour6: React.FC<{ music?: boolean }> = ({ music = false }) => {
  let pos = 0;
  const placed = J6_CLIPS.map((c) => {
    const frames = f(c.out) - f(c.in);
    const p = { ...c, from: pos, frames };
    pos += frames;
    return p;
  });
  const E = J6_EV;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {placed.map((c, i) => (
        <Sequence key={i} from={c.from} durationInFrames={c.frames} premountFor={30}>
          <OffthreadVideo src={staticFile(c.src)} trimBefore={f(c.in)} trimAfter={f(c.in) + c.frames} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Sequence>
      ))}

      <At from={0} to={J6_SEC.hook[1]}>
        <Hook frames={f(J6_SEC.hook[1])} />
      </At>
      <At from={J6_SEC.def[0]} to={J6_SEC.def[1]}>
        <DefCard />
      </At>
      <At from={J6_SEC.add[0]} to={J6_SEC.dmoins[1]}>
        <ProfileCard />
      </At>
      <At from={J6_SEC.etages[0]} to={J6_SEC.etages[1]}>
        <EtagesCard />
      </At>
      <At from={J6_SEC.regle[0]} to={J6_SEC.regle[1]}>
        <RegleCard />
      </At>
      <At from={J6_SEC.calcul[0]} to={J6_SEC.calcul[1]}>
        <CalculCard />
      </At>
      <At from={J6_SEC.conseil[0]} to={J6_SEC.conseil[1]}>
        <ConseilCard />
      </At>
      <At from={J6_SEC.question[0]} to={J6_END}>
        <FinCard />
      </At>

      {J6_SUBS.map(([a, b, t], i) => (
        <At key={i} from={a} to={b}>
          <Sub text={t} frames={f(b) - f(a)} />
        </At>
      ))}

      {/* bruitages discrets : un pop à chaque élément important */}
      {[E.add_100, E.add_200a, E.add_200b].map((t, i) => (
        <Sfx key={`c${i}`} at={t} name="pop-hi" volume={0.45} />
      ))}
      <Sfx at={E.dm_desc} name="pop-lo" volume={0.4} />
      <Sfx at={E.et_170} name="pop-mid" volume={0.4} />
      <Sfx at={E.rg_1km} name="pop-hi" volume={0.4} />
      <Sfx at={E.ca_15} name="pop-hi" volume={0.45} />
      <Sfx at={E.co_km} name="pop-mid" volume={0.4} />
      <Sfx at={E.co_dplus} name="pop-hi" volume={0.4} />

      {music && <Audio src={staticFile("music/hotrock.mp3")} trimBefore={f(97)} volume={(fr) => interpolate(fr, [0, 10, pos - 30, pos], [0, 0.1, 0.1, 0], clamp)} />}
    </AbsoluteFill>
  );
};
