// « Combien de fois par semaine courir quand on débute » (vidéo Communauté, au bureau). Généré puis relu. Temps en secondes dans la vidéo finale.
export const SM_CLIPS = [
  { src: "videos/semaine/p_r01.mp4", in: 3.1, out: 7.2 }, // hook
  { src: "videos/semaine/p_r02.mp4", in: 8.65, out: 14.55 }, // piege
  { src: "videos/semaine/p_r03.mp4", in: 0.1, out: 6.82 }, // jauges
  { src: "videos/semaine/p_r04.mp4", in: 0.0, out: 5.75 }, // semaine
  { src: "videos/semaine/p_r05.mp4", in: 0.62, out: 8.6 }, // moi
  { src: "videos/semaine/p_r06.mp4", in: 0.05, out: 3.75 }, // question
] as const;
export const SM_END = 34.066;
export const SM_SEC = {
  hook: [0.000, 4.100],
  piege: [4.100, 9.966],
  jauges: [9.966, 16.700],
  semaine: [16.700, 22.433],
  moi: [22.433, 30.400],
  question: [30.400, 34.066],
} as const;
export const SM_EV = {
  debutes: 0.300,
  conseil: 1.766,
  slam: 2.533,
  motive: 6.600,
  vite: 7.366,
  blesse: 9.700,
  souffle: 11.133,
  artic: 13.033,
  fin_jauges: 16.466,
  semaines: 17.166,
  rajouter: 20.533,
  deux: 26.300,
  trois: 27.366,
  quatre: 28.166,
  cinq: 29.400,
  combien: 31.600,
} as const;
export const SM_SUBS: [number, number, string][] = [
  [4.100, 5.833, "Quand on commence à courir ou le trail,"],
  [5.833, 8.233, "souvent on est super motivé, on veut progresser vite."],
  [8.500, 9.966, "Et c'est là justement qu'on se blesse."],
  [9.966, 12.566, "Parce que oui, ton souffle va progresser vite,"],
  [12.566, 14.966, "mais tes articulations et tes muscles, eux,"],
  [14.966, 16.700, "ont besoin de plus de temps pour progresser."],
  [16.700, 19.600, "Après plusieurs semaines, quand ça devient facile pour toi,"],
  [19.600, 22.433, "tu pourras rajouter une séance, voire deux par semaine."],
  [22.433, 24.800, "Pour préparer mon trail, que je fais dans quinze jours,"],
  [24.800, 26.200, "j'ai démarré comme ça :"],
  [26.200, 28.800, "deux séances, puis trois, puis quatre,"],
  [28.800, 30.400, "puis aujourd'hui cinq séances par semaine."],
  [30.400, 32.833, "Et toi, tu cours combien de fois par semaine ?"],
  [32.833, 34.066, "Dis-le-moi en commentaire."],
];
