// Version courte « Jour 5/22 » (~22 s) : on démarre dans l'action, mêmes textes et même style que la version longue.
import { AbsoluteFill, Audio, interpolate, OffthreadVideo, Sequence, staticFile } from "remotion";
import { At, Cta, Exo, Hook, Renfo, SectionTag, Sub } from "./Jour5";
import { J5C_CLIPS, J5C_MUSIC, J5C_SEG } from "./jour5court.data";

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const J5C_FRAMES = J5C_CLIPS.reduce((n, c) => n + (f(c.out) - f(c.in)), 0);

export const Jour5Court: React.FC<{ music?: boolean }> = ({ music = true }) => {
  let pos = 0;
  const placed = J5C_CLIPS.map((c) => {
    const frames = f(c.out) - f(c.in);
    const p = { ...c, from: pos, frames };
    pos += frames;
    return p;
  });
  const S = J5C_SEG;
  const end = pos / FPS;
  const renfoIn = J5C_CLIPS[1].in; // seconde du rush où commence le plan « RENFO »
  const at = (srcSec: number) => S.renfo[0] + (srcSec - renfoIn); // temps du rush → temps de la vidéo
  const voiceFrom = f(5.38 - renfoIn); // on entend « c'est séance renfo, let's go ! » (pas la fin de « aujourd'hui »)
  const ctaFrom = end - 1.7;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {placed.map((c, i) => (
        <Sequence key={i} from={c.from} durationInFrames={c.frames} premountFor={30}>
          <OffthreadVideo
            src={staticFile(c.src)}
            trimBefore={f(c.in)}
            trimAfter={f(c.in) + c.frames}
            volume={(fr) => (i === 1 ? interpolate(fr, [voiceFrom - 2, voiceFrom], [0, 1], clamp) : 0)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Sequence>
      ))}

      {/* ouverture : le hook dès la 1re image, sur le burpee */}
      <At from={0} to={S.ouverture[1]}>
        <Hook frames={f(S.ouverture[1])} instant />
      </At>

      {/* RENFO entre les mains */}
      <At from={at(5.15)} to={at(6.35)}>
        <Renfo frames={f(at(6.35)) - f(at(5.15))} />
      </At>
      <At from={at(6.46)} to={S.renfo[1]}>
        <Sub text={"Let's go !"} frames={f(S.renfo[1]) - f(at(6.46))} />
      </At>

      <At from={S.sac[0]} to={S.sac[1]}>
        <SectionTag text="Le matos du jour" frames={f(S.sac[1]) - f(S.sac[0])} />
      </At>

      <At from={S.elastique[0]} to={S.elastique[1]}>
        <SectionTag text="Échauffement · 10-15 min" frames={f(S.elastique[1]) - f(S.elastique[0])} />
      </At>
      <At from={S.elastique[0]} to={S.elastique[1]}>
        <Exo title="Élastique" frames={f(S.elastique[1]) - f(S.elastique[0])} small />
      </At>

      <At from={S.squats[0]} to={S.burpees[1]}>
        <SectionTag text="Circuit training · 5 tours" frames={f(S.burpees[1]) - f(S.squats[0])} />
      </At>
      {(
        [
          ["squats", "Squats", "10 répétitions"],
          ["pompes", "Pompes", "10 répétitions"],
          ["fentes", "Fentes", "10 de chaque côté"],
          ["burpees", "Burpees", "10 répétitions"],
        ] as const
      ).map(([k, t, d]) => (
        <At key={k} from={S[k][0]} to={S[k][1]}>
          <Exo title={t} detail={d} frames={f(S[k][1]) - f(S[k][0])} />
        </At>
      ))}

      <At from={S.corde[0]} to={ctaFrom}>
        <SectionTag text="Pour finir" frames={f(ctaFrom) - f(S.corde[0])} top={220} />
      </At>
      <At from={S.corde[0]} to={ctaFrom}>
        <Exo title="Corde à sauter" detail="5 × 1 minute" frames={f(ctaFrom) - f(S.corde[0])} top={315} />
      </At>
      <At from={ctaFrom} to={end}>
        <Cta />
      </At>

      {music && (
        <Audio
          src={staticFile(J5C_MUSIC.src)}
          trimBefore={f(J5C_MUSIC.offset)}
          volume={(fr) => {
            // musique pleine, baissée pendant « séance renfo, let's go ! », fondu de fin
            const r0 = f(S.renfo[0]);
            const r1 = f(S.renfo[1]);
            const duck = interpolate(fr, [r0 - 3, r0, r1, r1 + 3], [1, 0.3, 0.3, 1], clamp);
            return 0.75 * duck * interpolate(fr, [pos - 20, pos], [1, 0], clamp);
          }}
        />
      )}
    </AbsoluteFill>
  );
};
