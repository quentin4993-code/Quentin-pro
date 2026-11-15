export type Clip = {
  in: number; // seconde de début dans la source
  out: number; // seconde de fin dans la source
  kind: "talk" | "broll" | "end";
  zoom?: number; // zoom de base (faux changement de plan sur le face caméra)
};

export type Subtitle = { s: number; e: number; t: string };

export type VideoEdit = {
  src: string; // chemin dans public/
  hook: { top: string; highlight: string; sub?: string; duration: number };
  cta?: string;
  clips: Clip[];
  subtitles: Subtitle[];
};

export const FPS = 30;
export const f = (sec: number) => Math.round(sec * FPS);

export type PlacedClip = Clip & { from: number; frames: number };

// Calcule la position de chaque plan dans la vidéo finale (en images)
export const placeClips = (clips: Clip[]): PlacedClip[] => {
  let from = 0;
  return clips.map((c) => {
    const frames = f(c.out) - f(c.in);
    const placed = { ...c, from, frames };
    from += frames;
    return placed;
  });
};

export const totalFrames = (clips: Clip[]) =>
  placeClips(clips).reduce((a, c) => a + c.frames, 0);
