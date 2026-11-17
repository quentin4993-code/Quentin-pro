// « Courir lentement pour progresser » (vidéo Communauté, au bureau). Généré puis relu. Temps en secondes dans la vidéo finale.
export const LT_CLIPS = [
  { src: "videos/lent/p_r02.mp4", in: 0.25, out: 5.25 }, // hook
  { src: "videos/lent/p_r04.mp4", in: 0.0, out: 3.98 }, // bizarre
  { src: "videos/lent/p_r06.mp4", in: 0.0, out: 6.65 }, // pct
  { src: "videos/lent/p_r08.mp4", in: 3.15, out: 8.55 }, // parole
  { src: "videos/lent/p_r09.mp4", in: 0.0, out: 3.15 }, // parole
  { src: "videos/lent/p_r10.mp4", in: 8.5, out: 14.22 }, // moteur
  { src: "videos/lent/p_r12.mp4", in: 0.4, out: 5.75 }, // dur
  { src: "videos/lent/p_r13.mp4", in: 3.5, out: 6.7 }, // question
] as const;
export const LT_END = 38.433;
export const LT_SEC = {
  hook: [0.000, 5.000],
  bizarre: [5.000, 8.967],
  pct: [8.967, 15.633],
  parole: [15.633, 24.167],
  moteur: [24.167, 29.900],
  dur: [29.900, 35.233],
  question: [35.233, 38.433],
} as const;
export const LT_EV = {
  lentement: 4.333,
  pct80: 9.9,
  facile: 11.867,
  fondamentale: 13.867,
  parler: 17.733,
  phrases: 19.433,
  essouffle: 21.8,
  tropvite: 23.767,
  lent80: 25.033,
  moteur: 27.667,
  muscles: 28.733,
  coeur: 29.533,
  pct20: 30.267,
  envoyer: 33.3,
  fond: 36.833,
} as const;
export const LT_SUBS: [number, number, string][] = [
  [0.0, 1.733, "Pour aller plus vite dans le trail"],
  [1.733, 3.233, "et la course à pied,"],
  [3.233, 4.333, "il faut courir…"],
  [4.333, 5.0, "lentement."],
  [5.0, 6.933, "Alors oui, ça paraît bizarre dit comme ça,"],
  [6.933, 8.967, "mais c'est ce que font la plupart des coureurs pour progresser."],
  [8.967, 11.367, "À peu près 80 % des entraînements"],
  [11.367, 12.7, "se font à allure très facile,"],
  [12.867, 15.633, "c'est ce qu'on appelle l'allure fondamentale."],
  [15.633, 16.9, "Le repère, il est super simple :"],
  [16.9, 19.0, "tu dois être capable de parler, chanter,"],
  [19.0, 21.033, "faire des phrases complètes tout en courant."],
  [21.033, 23.233, "Et si t'es essoufflé quand tu fais ça,"],
  [23.233, 24.167, "c'est que tu vas trop vite."],
  [24.167, 26.6, "Le fait de courir lentement la plupart du temps,"],
  [26.6, 28.167, "ça permet de construire ton moteur,"],
  [28.167, 29.9, "donc tes muscles et ton cœur."],
  [29.9, 31.2, "Et dans les 20 % qui restent,"],
  [31.2, 32.167, "les séances dures,"],
  [32.167, 34.1, "c'est les séances où tu vas pouvoir envoyer"],
  [34.1, 35.233, "et vraiment te faire mal."],
  [35.233, 35.933, "Et toi ?"],
  [35.933, 37.467, "Tu cours lentement ou t'es toujours à fond ?"],
  [37.467, 38.433, "Dis-le-moi en commentaire."],
];
