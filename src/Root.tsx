import { Composition, Still } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { TikTokEdit } from "./tiktok/TikTokEdit";
import { rush1 } from "./tiktok/rush1";
import { jour4, jour4Neutre } from "./tiktok/jour4";
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
      {/* Couvertures TikTok (images fixes) */}
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
