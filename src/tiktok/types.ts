export type Clip = {
  in: number; // seconde de début dans la source
  out: number; // seconde de fin dans la source
  kind: "talk" | "broll" | "end";
  zoom?: number; // zoom de base (faux changement de plan sur le face caméra)
};

// Texte entre *étoiles* = mot mis en valeur (jaune)
export type Subtitle = { s: number; e: number; t: string };

// Animations ponctuelles. `at` = seconde dans la SOURCE, `dur` = durée à l'écran (s)
export type Callout =
  | { type: "slam"; at: number; dur: number; words: string[] } // gros texte qui claque sur les paysages
  | { type: "counter"; at: number; dur: number; value: number; unit: string; label: string } // compteur animé
  | { type: "progress"; at: number; dur: number; done: number; total: number; unit: string } // jauge de parcours
  | { type: "shake"; at: number; dur: number }; // tremblement de l'image

export type VideoEdit = {
  src: string; // chemin dans public/
  hook: { top: string; highlight: string; sub?: string; duration: number };
  cta?: string;
  clips: Clip[];
  subtitles: Subtitle[];
  subtitleTime?: "source" | "output"; // temps des sous-titres : dans la source (défaut) ou dans la vidéo finale
  callouts?: Callout[];
  // Ligne de parcours : points de repère (seconde source -> km parcourus)
  route?: { totalKm: number; checkpoints: { at: number; km: number }[] };
  // Tableau de classement (vidéo « tier list ») : at = seconde source du verdict
  tiers?: { label: string; col: number; at: number; ann?: number }[]; // at = verdict, ann = annonce de l'objet
  sfx?: boolean; // bruitages (pop sur le tableau, whoosh/impact du hook, ding de fin)
  ctaAt?: number; // seconde source où apparaît « Abonne-toi » (sinon : début du dernier plan)
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

// Convertit un temps source en image de la vidéo finale (si ce moment a été gardé)
export const toOutputFrame = (clips: PlacedClip[], sec: number): number | null => {
  for (const c of clips) {
    if (sec >= c.in - 0.001 && sec <= c.out + 0.001) return c.from + (f(sec) - f(c.in));
  }
  return null;
};
