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
import { Genoux, GN_FRAMES } from "./tiktok/Genoux";
import { Run6, R6_FRAMES } from "./tiktok/Run6";
import { J17, J17_FRAMES } from "./tiktok/J17";
import { CoverSimple } from "./tiktok/CoverSimple";
import { Episode, episodeFrames } from "./tiktok/Episode";
import { EP as EP_J16 } from "./tiktok/j16.data";
import { EP as EP_J14 } from "./tiktok/j14.data";
import { EP as EP_J13 } from "./tiktok/j13.data";
import { EP as EP_J12 } from "./tiktok/j12.data";
import { J15, J15_FRAMES } from "./tiktok/J15";
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
      <Composition id="J15" component={J15} durationInFrames={J15_FRAMES} fps={FPS} width={1080} height={1920} />
      <Composition id="J12" component={Episode} durationInFrames={episodeFrames(EP_J12)} fps={FPS} width={1080} height={1920} defaultProps={{ ep: EP_J12 }} />
      <Composition id="J13" component={Episode} durationInFrames={episodeFrames(EP_J13)} fps={FPS} width={1080} height={1920} defaultProps={{ ep: EP_J13 }} />
      <Composition id="J14" component={Episode} durationInFrames={episodeFrames(EP_J14)} fps={FPS} width={1080} height={1920} defaultProps={{ ep: EP_J14 }} />
      <Composition id="J16" component={Episode} durationInFrames={episodeFrames(EP_J16)} fps={FPS} width={1080} height={1920} defaultProps={{ ep: EP_J16 }} />
      <Still id="CouvJ16Groupe" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j16-groupe.jpg", big: "Renfo en groupe", small: "J-16 · Saint-Paul", top: 420, bigSize: 130 }} />
      <Still id="CouvJ16A" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j16-groupe.jpg", big: "Sport & Co 974", small: "Renfo gratuit · ouvert à tous", top: 420, bigSize: 130 }} />
      <Still id="CouvJ16B" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j16-groupe.jpg", big: "J-16", top: 400, bigSize: 230 }} />
      <Still id="CouvJ16C" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j16-planche.jpg", big: "Viens t’entraîner avec nous", small: "J-16", top: 330, bigSize: 104 }} />
      <Still id="CouvJ15Course" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j15-course.jpg", big: "10 km en 4 blocs", small: "J-15", top: 280, bigSize: 112 }} />
      <Still id="CouvJ15Pique" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j15-pique.jpg", big: "Ça pique !", small: "J-15 · 10 km en 4 blocs", top: 270, bigSize: 140 }} />
      <Still id="CouvJ14Foot" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j14-foot.jpg", big: "Dimanche foot", small: "J-14", top: 300, bigSize: 140 }} />
      <Still id="CouvJ13Tortue" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j13-tortue.jpg", big: "Visite surprise", small: "J-13 · récup à la plage", top: 330, bigSize: 130 }} />
      <Still id="CouvJ12Jungle" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j12-jungle.jpg", big: "Perdu dans la jungle", small: "J-12", top: 270, bigSize: 110 }} />
      <Still id="CouvJ12Sentier" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j12-sentier.jpg", big: "Je me suis perdu", small: "J-12 · rando en forêt", top: 1250, bigSize: 118 }} />
      <Still id="CouvJ17Drone" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j17-drone.jpg", big: "Mon premier trail", small: "J-17 · 26 km", top: 330, bigSize: 128 }} />
      <Still id="CouvJ17Chaise" component={CoverSimple} width={1080} height={1920} defaultProps={{ img: "covers/j17-chaise.jpg", big: "De 18 à 26 km", small: "J-17", top: 1300, bigSize: 120 }} />
      <Composition id="J17" component={J17} durationInFrames={J17_FRAMES} fps={FPS} width={1080} height={1920} />
      <Composition id="Run6" component={Run6} durationInFrames={R6_FRAMES} fps={FPS} width={1080} height={1920} />
      <Composition id="Genoux" component={Genoux} durationInFrames={GN_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="GenouxAvecMusique" component={Genoux} durationInFrames={GN_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      <Composition id="GenouxSansTexte" component={Genoux} durationInFrames={GN_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true, texts: false }} />
      <Composition id="GenouxSansTexteMuet" component={Genoux} durationInFrames={GN_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false, texts: false }} />
      <Composition id="Semaine" component={Semaine} durationInFrames={SM_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: false }} />
      <Composition id="SemaineAvecMusique" component={Semaine} durationInFrames={SM_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{ music: true }} />
      {/* Couvertures TikTok (images fixes) */}
      <Still id="MiniatureGenouxX" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/genoux-cut-x.png", keyword: "GENOUX", kwSize: 250, kwTop: 170, title: "Mal aux genoux ?", titleSize: 104, sub: "3 exercices sans matériel", imgTop: 180 }} />
      <Still id="MiniatureGenouxFente" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/genoux-cut-fente.png", keyword: "3", kwSize: 700, kwTop: 20, title: "3 exercices genoux", titleSize: 96, sub: "pour courir avec des genoux solides", imgTop: 0 }} />
      <Still id="MiniatureSemaineA" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/sem-cut-a.png", keyword: "2-3×", kwSize: 330, kwTop: 110, title: "Pas tous les jours !", titleSize: 92, sub: "Le conseil pour bien débuter", imgTop: -170 }} />
      <Still id="MiniatureSemaineC" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/sem-cut-c.png", keyword: "2-3×", kwSize: 330, kwTop: 110, title: "Pas tous les jours !", titleSize: 92, sub: "Le conseil pour bien débuter", imgTop: -80 }} />
      <Still id="MiniatureSemaineD" component={CoverPro} width={1080} height={1920} defaultProps={{ cut: "covers/sem-cut-d.png", keyword: "REPOS", kwSize: 300, kwTop: 125, title: "Combien par semaine ?", titleSize: 84, sub: "Quand tu débutes la course", imgTop: -80 }} />
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
