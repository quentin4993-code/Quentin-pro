// Montage « Jour 5/22 » — séance renfo. Généré à partir de la timeline calée sur la musique, puis relu.
// Tous les temps des textes sont en secondes dans la vidéo finale.
export type J5Clip = { src: string; in: number; out: number };
export const J5_MUSIC = { src: "music/retrofuture-clean.mp3", offset: 98.918 };
export const J5_DROP = 25.100; // début de l'action = premier temps fort de la musique
export const J5_CLIPS: J5Clip[] = [
  { src: "videos/jour5/p01.mp4", in: 0.900, out: 7.600 }, // intro
  { src: "videos/jour5/p03.mp4", in: 0.000, out: 9.067 }, // intro
  { src: "videos/jour5/p02.mp4", in: 0.000, out: 9.333 }, // intro
  { src: "videos/jour5/p09.mp4", in: 2.600, out: 6.533 }, // sac
  { src: "videos/jour5/p10.mp4", in: 4.200, out: 8.200 }, // matos
  { src: "videos/jour5/p04.mp4", in: 9.000, out: 11.600 }, // elastique
  { src: "videos/jour5/p05.mp4", in: 8.600, out: 11.267 }, // tete
  { src: "videos/jour5/p05.mp4", in: 25.000, out: 27.600 }, // hanches
  { src: "videos/jour5/p05.mp4", in: 41.500, out: 44.167 }, // genoux
  { src: "videos/jour5/p06.mp4", in: 6.000, out: 9.300 }, // squats
  { src: "videos/jour5/p07.mp4", in: 35.300, out: 38.600 }, // pompes
  { src: "videos/jour5/p06.mp4", in: 80.200, out: 83.500 }, // fentes
  { src: "videos/jour5/p08.mp4", in: 26.200, out: 29.467 }, // burpees
  { src: "videos/jour5/p11.mp4", in: 30.500, out: 36.433 }, // corde
];
export const J5_SEG = {
  sac: [25.100, 29.033],
  matos: [29.033, 33.033],
  elastique: [33.033, 35.633],
  tete: [35.633, 38.300],
  hanches: [38.300, 40.900],
  genoux: [40.900, 43.567],
  squats: [43.567, 46.867],
  pompes: [46.867, 50.167],
  fentes: [50.167, 53.467],
  burpees: [53.467, 56.733],
  corde: [56.733, 62.667],
} as const;
