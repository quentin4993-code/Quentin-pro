// Version courte « Jour 5/22 » (~22 s) : ouverture dans l'action, coupes sur les temps de « Hotrock ».
import type { J5Clip } from "./jour5.data";
export const J5C_MUSIC = { src: "music/hotrock.mp3", offset: 96.920 };
export const J5C_CLIPS: J5Clip[] = [
  { src: "videos/jour5/p08.mp4", in: 26.600, out: 29.433 }, // ouverture
  { src: "videos/jour5/p01.mp4", in: 5.050, out: 6.917 }, // renfo
  { src: "videos/jour5/p09.mp4", in: 4.400, out: 6.267 }, // sac
  { src: "videos/jour5/p04.mp4", in: 9.000, out: 11.333 }, // elastique
  { src: "videos/jour5/p06.mp4", in: 6.600, out: 8.967 }, // squats
  { src: "videos/jour5/p07.mp4", in: 35.600, out: 37.933 }, // pompes
  { src: "videos/jour5/p06.mp4", in: 80.800, out: 83.167 }, // fentes
  { src: "videos/jour5/p08.mp4", in: 14.000, out: 16.333 }, // burpees
  { src: "videos/jour5/p11.mp4", in: 42.000, out: 45.733 }, // corde
];
export const J5C_SEG = {
  ouverture: [0.000, 2.833],
  renfo: [2.833, 4.700],
  sac: [4.700, 6.567],
  elastique: [6.567, 8.900],
  squats: [8.900, 11.267],
  pompes: [11.267, 13.600],
  fentes: [13.600, 15.967],
  burpees: [15.967, 18.300],
  corde: [18.300, 22.033],
} as const;
