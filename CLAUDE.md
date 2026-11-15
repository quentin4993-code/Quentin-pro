# Projet Quentin-pro — vidéos TikTok avec Remotion

Série de vlogs course à pied « Jour X / 22 » (préparation du premier trail de Quentin), montés avec Remotion au format TikTok 1080×1920.

## À lire avant toute vidéo
1. `docs/DA.md` — direction artistique **validée** (obligatoire, notamment la section « À NE PLUS FAIRE »).
2. `docs/METHODE.md` — processus complet : envoi des rushes par les Releases GitHub, préparation, transcription, montage, rendu.
3. `docs/SUIVI.md` — état du projet et historique des demandes.

Raccourci d'envoi des vidéos pour Quentin : https://claude.ai/artifact/RYnegRCEi893sVQPtRhuJx (Releases nommées `jour-X`). Chercher la dernière Release avec l'outil GitHub `list_releases`.

## Règles essentielles
- Parler à Quentin en **français**, simplement (il travaille souvent depuis iPad/iPhone).
- Quentin **prépare** son premier trail (22 jours de prépa) : ne jamais écrire comme s'il le courait (« PRÉPA 1ER TRAIL », pas « MON 1ER TRAIL » seul).
- Style : pro, dynamique, sobre. **Pas de zoom, pas de flash, pas de gros textes « motivation », pas de mots en jaune dans les sous-titres, une seule jauge (la ligne de parcours en bas).**
- Garder : hook en 3 blocs (blanc / jaune / petite ligne), sous-titres classiques blancs contour noir, compteur « IL RESTE X KM », ligne de parcours, fin « Abonne-toi » + flèche.
- Musique : vraie musique énergique libre de droits (incompetech.com), jamais de musique synthétisée maison ; rappeler le crédit pour la description TikTok.
- Pour chaque vidéo, proposer aussi une description accrocheuse (3 options, voir `docs/DESCRIPTIONS.md`) et 2 couvertures TikTok (`src/tiktok/Cover.tsx`) : plan d'action + gros plan visage.
- Livrer chaque version avec un **nom de fichier numéroté** (`out/JourX-TikTok-VN.mp4`).
- Modèle de montage : `src/tiktok/rush1.ts` (Jour 3). Mettre à jour `docs/SUIVI.md` après chaque version.
