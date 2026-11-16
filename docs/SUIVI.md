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
| Vidéo Jour 4 (`Jour4`) | 🟡 V2 livrée — en attente de retours |

Légende : ✅ fait · 🟡 en cours · ⬜ à faire · ⛔ bloqué

## Vidéos

| ID composition | Sujet | Format | Durée | Statut | Source | Fichier final |
|---|---|---|---|---|---|---|
| `Jour3` | Vlog course « Jour 3/22 », sortie longue 10 km | 1080×1920 · 30 fps | 43 s | ✅ V5 validée | `rushes-1` | `out/Jour3-TikTok-V5.mp4` |
| `Jour4` | Classement du matériel de trail (indispensable / utile / pas indispensable) | 1080×1920 · 30 fps | 64 s | 🟡 V2 | Release `jour-4` | `out/Jour4-TikTok-V2.mp4` |
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

### 2026-11-16 — Jour 4, V1
- Rushes : Release `jour-4` (3 fichiers DJI Mimo) : 2 prises de l'intro (4 s) + face caméra intérieur de 4 min 09, sans images de course.
- Sujet : classement de 12 objets (gilet, flasques, frontale, veste, gels/barres, bâtons, lunettes, casquette/buff, crème anti-frottement, sifflet, montre GPS, écouteurs).
- Source unique `public/videos/jour4.mp4` = intro (prise a, 0,3 → 3,6 s) + vidéo principale ; temps de la principale décalés de +3,3 s.
- Montage 4 min 09 → 1 min 04 : pauses, répétitions et ratés de fin coupés ; coupes vérifiées en retranscrivant le son monté.
- Pas de ligne de parcours ni de compteur km (pas de course) → **tableau de classement** en haut (`src/tiktok/TierBoard.tsx`), « entre les deux » = étiquette en pointillés à cheval sur deux colonnes.
- Hook « MATOS DE TRAIL / INDISPENSABLE ? / Jour 4/22 · prépa 1er trail ». Musique « Raving Energy » (version longue `raving-energy-long.mp3`), basse sous la voix, fondu de fin.
- Couvertures : `out/Couverture-Jour4-Visage-V1.jpg`, `out/Couverture-Jour4-Large-V1.jpg`. Descriptions : `docs/DESCRIPTIONS.md`.

### Jour 4, V2 — retours
- Retiré « Jour 4/22 » partout (hook, couvertures, descriptions) : « ça n'a rien à voir ».
- Fin : « Abonne-toi pour la suite » au lieu de « pour suivre les 22 jours ».
- Hook : « MATOS DE TRAIL / INDISPENSABLE ? / Mon classement honnête ». Couvertures : même texte.
- Règles ajoutées dans `DA.md` et `CLAUDE.md`.
