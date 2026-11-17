import { Composition, Still } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { TikTokEdit } from "./tiktok/TikTokEdit";
import { rush1 } from "./tiktok/rush1";
import { jour4, jour4Neutre } from "./tiktok/jour4";
import { Jour5, J5_FRAMES } from "./tiktok/Jour5";
import { CoverJ5 } from "./tiktok/CoverJ5";
import { Jour5Court, J5C_FRAMES } from "./tiktok/Jour5Court";
import { Jour6, J6_FRAMES } from "./tiktok/Jour6";
import { CoverJ6 } from "./tiktok/CoverJ6";
import { CoverJ6Pro, CoverPro } from "./tiktok/CoverJ6Pro";
import { Lent, LT_FRAMES } from "./tiktok/Lent";
import { Semaine, SM_FRAMES } from "./tiktok/Semaine";
import { FPS, totalFrames } from "./tiktok/types";
import { Cover } from "./tiktok/Cover";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Jour3"
        component={TikTokEdit}
        durationInFrames={totalFrames(rush1.clips)}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ edit: rush1, music: "" }}
      />
      <Composition
        id="Jour4"
        component={TikTokEdit}
        durationInFrames={totalFrames(jour4.clips)}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ edit: jour4, music: "" }}
      />
      <Composition
        id="Jour4Neutre"
        component={TikTokEdit}
        durationInFrames={totalFrames(jour4Neutre.clips)}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ edit: jour4Neutre, music: "" }}
      />
      <Composition id="Jour5" component={Jour5} durationInFrames={J5_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      <Composition id="Jour5SansMusique" component={Jour5} durationInFrames={J5_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="Jour5Court" component={Jour5Court} durationInFrames={J5C_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      <Composition id="Jour5CourtSansMusique" component={Jour5Court} durationInFrames={J5C_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="Jour6" component={Jour6} durationInFrames={J6_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="Jour6AvecMusique" component={Jour6} durationInFrames={J6_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      <Composition id="Lent" component={Lent} durationInFrames={LT_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="LentAvecMusique" component={Lent} durationInFrames={LT_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      <Composition id="Semaine" component={Semaine} durationInFrames={SM_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="SemaineAvecMusique" component={Semaine} durationInFrames={SM_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      {/* Couvertures TikTok (images fixes) */}
      <Still id="MiniatureSemaineA" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/sem-cut-a.png", keyword: "2-3×", kwSize: 330, kwTop: 110, title: "Pas tous les jours !", titleSize: 92, sub: "Le conseil pour bien débuter", imgTop: -170 }} />
      <Still id="MiniatureSemaineB" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/sem-cut-b.png", keyword: "REPOS", kwSize: 300, kwTop: 125, title: "Combien par semaine ?", titleSize: 84, sub: "Quand tu débutes la course", imgTop: -170 }} />
      <Still id="MiniatureLentSurpris" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/lent-cut-surpris.png", keyword: "80/20", kwSize: 380, kwTop: 260, title: "Cours plus lentement", titleSize: 90, sub: "pour progresser plus vite en trail", imgTop: -330 }} />
      <Still id="MiniatureLentExplique" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/lent-cut-explique.png", keyword: "LENT", kwSize: 420, kwTop: 250, title: "Tu cours trop vite", titleSize: 116, sub: "Le secret des coureurs qui progressent", imgTop: -330 }} />
      <Still id="CoverDeniveleProDoigts" component={CoverJ6Pro} width={1080} height={1920} defaultProps={{ variant: "doigts" as const }} />
      <Still id="CoverDeniveleProQuestion" component={CoverJ6Pro} width={1080} height={1920} defaultProps={{ variant: "question" as const }} />
      <Still id="CoverDeniveleHook" component={CoverJ6} width={1080} height={1920} defaultProps={{ variant: "hook" as const }} />
      <Still id="CoverDeniveleQuestion" component={CoverJ6} width={1080} height={1920} defaultProps={{ variant: "question" as const }} />
      <Still id="CoverJour5Renfo" component={CoverJ5} width={1080} height={1920} defaultProps={{ variant: "renfo" as const }} />
      <Still id="CoverJour5Saut" component={CoverJ5} width={1080} height={1920} defaultProps={{ variant: "saut" as const }} />
      <Still
        id="CoverJour3Course"
        component={Cover}
        width={1080}
        height={1920}
        defaultProps={{ bg: "covers/jour3-41.3.jpg", day: "JOUR 3 / 22", highlight: "PRÉPA 1ER TRAIL", sub: "10 km · déjà mal aux jambes…", position: "bottom" as const }}
      />
      <Still
        id="CoverJour3Visage"
        component={Cover}
        width={1080}
        height={1920}
        defaultProps={{ bg: "covers/jour3-24.5.jpg", day: "JOUR 3 / 22", highlight: "PRÉPA 1ER TRAIL", sub: "10 km · déjà mal aux jambes…", position: "top" as const }}
      />
      <Still
        id="CoverJour4Visage"
        component={Cover}
        width={1080}
        height={1920}
        defaultProps={{ bg: "covers/jour4-visage.jpg", day: "MATOS DE TRAIL", highlight: "INDISPENSABLE ?", sub: "Mon classement honnête", position: "bottom" as const }}
      />
      <Still
        id="CoverJour4Large"
        component={Cover}
        width={1080}
        height={1920}
        defaultProps={{ bg: "covers/jour4-large.jpg", day: "MATOS DE TRAIL", highlight: "INDISPENSABLE ?", sub: "Mon classement honnête", position: "bottom" as const }}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
