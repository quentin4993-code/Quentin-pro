import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { TikTokEdit } from "./tiktok/TikTokEdit";
import { rush1 } from "./tiktok/rush1";
import { FPS, totalFrames } from "./tiktok/types";

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
        defaultProps={{ edit: rush1, music: "music/raving-energy.mp3" }}
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
