// Montage de la vidéo « Jour 3/22 » — temps en secondes dans la vidéo source.
import type { VideoEdit } from "./types";

export const rush1: VideoEdit = {
  src: "videos/rush1.mp4",
  hook: {
    top: "22 JOURS POUR PRÉPARER",
    highlight: "MON 1ER TRAIL",
    sub: "Jour 3 : j'ai déjà mal aux jambes…",
    duration: 3.2,
  },
  cta: "Abonne-toi pour suivre les 22 jours",
  clips: [
    // Face caméra 1
    { in: 0.0, out: 6.8, kind: "talk", zoom: 1 },
    { in: 6.83, out: 8.92, kind: "talk", zoom: 1.15 },
    { in: 10.2, out: 11.95, kind: "talk", zoom: 1 },
    // Paysages 1
    { in: 11.6, out: 12.6, kind: "broll" },
    { in: 13.0, out: 13.9, kind: "broll" },
    { in: 14.5, out: 15.7, kind: "broll" },
    { in: 17.3, out: 18.3, kind: "broll" },
    { in: 19.0, out: 20.0, kind: "broll" },
    // Face caméra 2
    { in: 20.95, out: 23.4, kind: "talk", zoom: 1 },
    { in: 23.4, out: 28.85, kind: "talk", zoom: 1.15 },
    { in: 29.78, out: 32.85, kind: "talk", zoom: 1 },
    // Paysages 2
    { in: 33.3, out: 34.5, kind: "broll" },
    { in: 35.0, out: 36.3, kind: "broll" },
    { in: 37.2, out: 38.7, kind: "broll" },
    { in: 39.3, out: 40.5, kind: "broll" },
    { in: 41.0, out: 42.8, kind: "broll" },
    { in: 44.0, out: 45.3, kind: "broll" },
    // Récap Strava
    { in: 48.1, out: 51.15, kind: "end" },
  ],
  // Sous-titres (texte corrigé), temps dans la vidéo source
  subtitles: [
    { s: 0.02, e: 1.56, t: "Jour 3 sur 22" },
    { s: 1.56, e: 3.8, t: "avant mon premier trail officiel" },
    { s: 3.8, e: 4.64, t: "et aujourd'hui on finit" },
    { s: 4.64, e: 5.24, t: "ma sortie longue" },
    { s: 5.24, e: 6.8, t: "donc il nous reste 10 km" },
    { s: 7.0, e: 7.42, t: "Pour être honnête" },
    { s: 7.42, e: 8.22, t: "j'ai un petit peu mal" },
    { s: 8.22, e: 8.92, t: "aux jambes ce matin" },
    { s: 10.2, e: 11.12, t: "mais je m'attendais" },
    { s: 11.12, e: 11.95, t: "au pire" },
    { s: 20.95, e: 21.46, t: "Bon, on est rendu" },
    { s: 21.46, e: 22.26, t: "à moitié du parcours" },
    { s: 22.26, e: 23.4, t: "il nous reste 5 km" },
    { s: 23.4, e: 24.42, t: "je me sens plutôt bien" },
    { s: 24.42, e: 25.64, t: "les jambes sont un peu lourdes" },
    { s: 25.64, e: 27.62, t: "mais j'ai un bon rythme" },
    { s: 27.62, e: 28.85, t: "donc on va continuer comme ça" },
    { s: 29.78, e: 31.38, t: "et on va finir ce petit run" },
    { s: 31.38, e: 32.85, t: "sans blessure en tout cas" },
  ],
};
