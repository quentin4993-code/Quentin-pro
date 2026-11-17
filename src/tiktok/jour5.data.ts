// Montage « Jour 5/22 » — séance renfo. Généré à partir de la timeline calée sur la musique, puis relu.
// Tous les temps des textes sont en secondes dans la vidéo finale.
export type J5Clip = { src: string; in: number; out: number };
export const J5_MUSIC = { src: "music/hotrock.mp3", offset: 71.820 };
export const J5_DROP = 25.100; // début de l'action = temps fort de la musique
export const J5_CLIPS: J5Clip[] = [
  { src: "videos/jour5/p01.mp4", in: 0.900, out: 7.600 }, // intro
  { src: "videos/jour5/p03.mp4", in: 0.000, out: 9.067 }, // intro
  { src: "videos/jour5/p02.mp4", in: 0.000, out: 9.333 }, // intro
  { src: "videos/jour5/p09.mp4", in: 2.600, out: 6.367 }, // sac
  { src: "videos/jour5/p10.mp4", in: 4.200, out: 7.933 }, // matos
  { src: "videos/jour5/p04.mp4", in: 9.000, out: 11.800 }, // elastique
  { src: "videos/jour5/p05.mp4", in: 8.600, out: 11.433 }, // tete
  { src: "videos/jour5/p05.mp4", in: 25.000, out: 27.833 }, // hanches
  { src: "videos/jour5/p05.mp4", in: 41.500, out: 44.300 }, // genoux
  { src: "videos/jour5/p06.mp4", in: 6.000, out: 9.267 }, // squats
  { src: "videos/jour5/p07.mp4", in: 35.300, out: 38.567 }, // pompes
  { src: "videos/jour5/p06.mp4", in: 80.200, out: 83.500 }, // fentes
  { src: "videos/jour5/p08.mp4", in: 26.200, out: 29.467 }, // burpees
  { src: "videos/jour5/p11.mp4", in: 41.200, out: 47.300 }, // corde
];
export const J5_SEG = {
  sac: [25.100, 28.867],
  matos: [28.867, 32.600],
  elastique: [32.600, 35.400],
  tete: [35.400, 38.233],
  hanches: [38.233, 41.067],
  genoux: [41.067, 43.867],
  squats: [43.867, 47.133],
  pompes: [47.133, 50.400],
  fentes: [50.400, 53.700],
  burpees: [53.700, 56.967],
  corde: [56.967, 63.067],
} as const;
