# Suivi du projet

> Mettre à jour à chaque session de travail.

## État actuel

| Élément | Statut |
|---|---|
| Installation Remotion | ✅ v4.0.543 |
| Méthode d'envoi des vidéos lourdes (Releases GitHub) | ✅ Validée |
| Direction artistique | ✅ Validée — voir [DA.md](DA.md) |
| Méthode de travail | ✅ À jour — voir [METHODE.md](METHODE.md) |
| Vidéo Jour 3 (`Jour3`) | ✅ V5 validée (« parfait ») |
| Vidéo suivante | ⬜ En attente des rushes (`rushes-2`) |

Légende : ✅ fait · 🟡 en cours · ⬜ à faire · ⛔ bloqué

## Vidéos

| ID composition | Sujet | Format | Durée | Statut | Source | Fichier final |
|---|---|---|---|---|---|---|
| `Jour3` | Vlog course « Jour 3/22 », sortie longue 10 km | 1080×1920 · 30 fps | 43 s | ✅ V5 validée | `rushes-1` | `out/Jour3-TikTok-V5.mp4` |
| `Jour4` (étirements) | 8 étirements, sans voix, hook + noms + « 30 SEC » | 1080×1920 · 30 fps | 26 s | 🟡 V1 livrée, musique à choisir | Release `jour-16` (nommée par erreur, c'est le Jour 4) | `out/Jour4-TikTok-V1.mp4` |
| `HelloWorld` | Test d'installation | 1920×1080 · 30 fps | 5 s | ✅ | — | — |

## Prochaines étapes

- [ ] Recevoir les rushes du jour suivant (`rushes-2`) avec le numéro du jour et la distance
- [ ] Monter en suivant [METHODE.md](METHODE.md) et [DA.md](DA.md)
- [ ] (Option) Faire une version « modèle » réutilisable si la série garde la même structure

---

## Historique des demandes de Quentin

| # | Demande | Ce qui a été fait |
|---|---|---|
| 1 | Installer Remotion | Projet Remotion + React + TypeScript, rendu de test |
| 2 | Créer les fichiers suivi, méthode, DA | `docs/SUIVI.md`, `docs/METHODE.md`, `docs/DA.md` |
| 3 | Pouvoir m'envoyer des vidéos lourdes | Dossier `public/videos/` (limite 25 Mo) puis **Releases GitHub** (2 Go) avec lien pré-rempli |
| 4 | Peut-on travailler sur iPad / téléphone ? | Non en direct : seulement sur ordinateur (Claude Desktop). Sur iPad → Releases |
| 5 | Première vidéo : hook écrit, sous-titres classiques, musique adaptée, vidéo dynamique qui donne envie de rester | V1 : transcription Whisper, hook, sous-titres, musique, coupes, appel à s'abonner |
| 6 | Ajouter des animations + enlever le « JOUR 3/22 » d'origine (répétition) | V2 : texte d'origine effacé, animations ajoutées |
| 7 | Trop de zooms et de flashs, plans trop courts (« bâclé ») ; ajouter une ligne de circuit en bas départ → arrivée ; hook et fin « super cool » | V3 : zooms/flashs/secousses retirés, plans de 1,5–3,5 s avec fondus, **ligne de parcours** |
| 8 | Trop d'écritures en jaune ; enlever « CAP SUR L'OCÉAN », « LES 5 DERNIERS KM », « ON NE LÂCHE RIEN » | V4 : plus de mots en jaune ni de gros textes sur les paysages (et « C'EST PARTI ») |
| 9 | Enlever la jauge « mi-parcours » du haut (doublon) ; musique nulle → plus motivante ; « fais quelque chose de bien » | V5 : jauge du haut retirée, vraie musique « Raving Energy » (Kevin MacLeod) ; fichiers numérotés par version |
| 10 | Enregistrer tout ce qu'on s'est dit et ma DA pour les prochaines vidéos | DA, méthode, suivi et `CLAUDE.md` mis à jour |
| 11 | Photo de couverture TikTok dans le style du hook | 2 couvertures : `out/Couverture-Jour3-Course.jpg` et `out/Couverture-Jour3-Visage.jpg` |
| 12 | Description TikTok accrocheuse | 3 options dans `docs/DESCRIPTIONS.md` |
| 14 | Raccourci pour envoyer les vidéos lourdes | Page https://claude.ai/artifact/RYnegRCEi893sVQPtRhuJx |
| 15 | Jour 4 : vidéo d'étirements, même DA, hook sur la serviette + 1re position, noms des étirements, musique cool pas électro, couper les longueurs | V1 : 43 s → 26 s (≈2,5 s par posture), nom + « ⏱ 30 SEC » en haut, hook en bas sur la serviette, fin « Abonne-toi ». Musique en attente (incompetech bloqué dans cette session) |
| 13 | « MON 1ER TRAIL » fait croire que je cours le trail, alors que je le **prépare** | Couvertures → « PRÉPA 1ER TRAIL » (V2), descriptions corrigées, règle ajoutée dans la DA et `CLAUDE.md` |

---

## Journal

### 2026-11-15 — Mise en place
- Installation de Remotion, React et TypeScript ; composition de test `HelloWorld`.
- Création de `SUIVI.md`, `METHODE.md`, `DA.md`.
- Envoi de vidéo : le dossier `public/videos/` ne suffit pas (25 Mo max par le site GitHub) → **Releases GitHub** (`rushes-1`) : `rush1.mov`, 51 s, vertical 4K, vlog course « JOUR 3/22 ».
- Environnement cloud **« Quentin-pro »** créé : accès à huggingface.co (transcription) puis incompetech.com (musique).

### 2026-11-15 — Jour 3, V1
- Transcription Whisper, sous-titres corrigés.
- Musique synthétisée maison (abandonnée depuis).
- Montage 51 s → 38 s, hook, sous-titres, barre de progression, appel à s'abonner ; voix normalisée.

### V2
- Texte « JOUR 3/22 » d'origine effacé (`scripts/prepare_rush.sh`, option `DELOGO`) et caché sous le hook.
- Animations : transitions flou/zoom, mots-clés en jaune, compteur 10 KM, carte mi-parcours, gros textes sur les paysages, secousses. *(La plupart retirées ensuite.)*

### V3 — retours
- Retiré : zooms, flashs/flous, secousses de l'image. Plans de paysage rallongés (1,5–3,5 s) avec fondus de 6 images.
- Ajout de la **ligne de parcours** en bas (`src/tiktok/Circuit.tsx`). Barre du haut retirée.

### V4 — retours
- Retiré : mots en jaune dans les sous-titres, gros textes sur les paysages.

### V5 — retours (validée : « parfait »)
- Retiré : carte « MI-PARCOURS » en haut.
- Musique : « Raving Energy » – Kevin MacLeod, CC BY 4.0, passage 1:11 → 1:55 (`public/music/raving-energy.mp3`). Crédit à mettre dans la description TikTok.
- Fichiers livrés avec numéro de version (`out/Jour3-TikTok-V5.mp4`).

### Enregistrement de la DA
- `docs/DA.md` réécrit avec tous les choix validés et la liste de ce qu'il ne faut plus faire.
- `docs/METHODE.md` réécrit avec le processus complet (envoi → préparation → transcription → montage → rendu → livraison).
- `CLAUDE.md` ajouté à la racine pour que les prochaines sessions appliquent la DA automatiquement.

### Couverture Jour 3
- Composant `src/tiktok/Cover.tsx` + compositions `CoverJour3Course` (image à 41,3 s) et `CoverJour3Visage` (image à 24,5 s).
- Fichiers : `out/Couverture-Jour3-Course.jpg`, `out/Couverture-Jour3-Visage.jpg`.

### Nettoyage
- Fichiers de travail supprimés à la demande de Quentin (il a tout enregistré) : rushes téléchargés (`public/videos/`), images de couverture (`public/covers/`), rendus (`out/`), fichiers temporaires.
- Gardé : DA, méthode, suivi, descriptions, code du montage, police et musique.
- Pour refaire un rendu du Jour 3 : retélécharger `rushes-1` depuis les Releases (si elle existe encore) puis relancer `scripts/prepare_rush.sh` (voir `METHODE.md`).

### 2026-11-16 — Jour 4 (étirements), V1
- Source : Release `jour-16` (mal nommée), 43 s, pas de voix. Postures : cobra, chien tête en bas, fente profonde, ischios, enfant, pigeon, torsion, papillon.
- Remotion non installable dans cette session (pas de réseau npm) → rendu des calques avec Chromium/Playwright, mêmes styles que `TikTokEdit.tsx` (`tools/etirements/`).
- Hook placé en bas (le visage est en haut sur le plan debout). Noms en bloc blanc + « ⏱ 30 SEC » en bloc jaune, en haut.
- Musique : pas encore (Quentin veut du dynamique, pas d'électro ; incompetech inaccessible ici).
