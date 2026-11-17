# Projet Quentin-pro — vidéos TikTok avec Remotion

Série de vlogs course à pied « Jour X / 22 » (préparation du premier trail de Quentin), montés avec Remotion au format TikTok 1080×1920.

## À lire avant toute vidéo
1. `docs/DA.md` — direction artistique **validée** (obligatoire, notamment la section « À NE PLUS FAIRE »).
2. `docs/METHODE.md` — processus complet : envoi des rushes par les Releases GitHub, préparation, transcription, montage, rendu.
3. `docs/SUIVI.md` — état du projet et historique des demandes.

Raccourci d'envoi des vidéos pour Quentin : https://claude.ai/artifact/RYnegRCEi893sVQPtRhuJx (Releases nommées `jour-X`). Chercher la dernière Release avec l'outil GitHub `list_releases`.

## Règles essentielles
- **Quand Quentin demande de changer le style / la DA, ne JAMAIS toucher aux textes** (hook, sous-titres, tableau, fin) : seulement police, couleurs, animations.
- Parler à Quentin en **français**, simplement (il travaille souvent depuis iPad/iPhone).
- Quentin **prépare** son premier trail (22 jours de prépa) : ne jamais écrire comme s'il le courait (« PRÉPA 1ER TRAIL », pas « MON 1ER TRAIL » seul).
- Style : pro, dynamique, sobre. **Pas de zoom, pas de flash, pas de gros textes « motivation », pas de mots en jaune dans les sous-titres, une seule jauge (la ligne de parcours en bas).**
- **Deux formats par jour** (stratégie validée) : 1) **vidéo « Défi »** = journal de prépa, garde « Jour X/22 » ; 2) **vidéo « Communauté »** = conseil / classement / avis qui parle au spectateur (type Jour 4), **sans** « Jour X/22 ». Voir `docs/STRATEGIE.md`. Fin : « **Abonne-toi pour la suite** » (pas « pour suivre les 22 jours »).
- Garder : hook en 3 blocs (blanc / jaune / petite ligne), sous-titres classiques blancs contour noir, compteur « IL RESTE X KM », ligne de parcours, fin « Abonne-toi » + flèche.
- Musique : **AUCUNE musique électro, plus jamais** (ni « Raving Energy », ni synthétisée). Si Quentin veut une musique : morceau incompetech **non électro** (funk, rock… vraies batteries / guitares, filtré via `pieces.json`), calé sur les temps, + **toujours une version sans musique** pour ajouter un son connu dans TikTok. Quentin veut du **dynamique qui donne envie de faire du sport** : rock énergique (Jour 5 V2 : « Hotrock », 128 BPM). « RetroFuture Clean » (funk 92 BPM) refusé : « ça donne pas envie ».
- Sur les plans d'exercice, **toujours vérifier image par image qu'il n'y a pas de raté** (corde qui s'arrête, relance…) avant de choisir le passage.
- DA « sobre / classique » (demandée Jour 5) : police Inter, blanc + pastilles beiges, texte marron, fondus doux, pas de blocs jaunes. Modèle : `src/tiktok/Jour5.tsx` (hook, révélation de mot entre les mains, carte programme, étiquettes de section, titres d'exercices en haut sur le ciel). Voir `docs/DA.md`.
- Miniatures : style **« pro »** = silhouette détourée + gros mot-clé derrière + bandeau titre (`src/tiktok/CoverJ6Pro.tsx`), plus beau que la simple photo + texte.
- Pour chaque vidéo, proposer aussi une description accrocheuse (3 options, voir `docs/DESCRIPTIONS.md`) et 2 couvertures TikTok (`src/tiktok/Cover.tsx`) : plan d'action + gros plan visage.
- Livrer chaque version avec un **nom de fichier numéroté** (`out/JourX-TikTok-VN.mp4`).
- Modèle de montage : `src/tiktok/rush1.ts` (Jour 3). Mettre à jour `docs/SUIVI.md` après chaque version.
