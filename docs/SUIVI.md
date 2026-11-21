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
| Vidéo Jour 4 (`Jour4`) | 🟡 V5 livrée — en attente de retours |

Légende : ✅ fait · 🟡 en cours · ⬜ à faire · ⛔ bloqué

## Vidéos

| ID composition | Sujet | Format | Durée | Statut | Source | Fichier final |
|---|---|---|---|---|---|---|
| `Jour3` | Vlog course « Jour 3/22 », sortie longue 10 km | 1080×1920 · 30 fps | 43 s | ✅ V5 validée | `rushes-1` | `out/Jour3-TikTok-V5.mp4` |
| `Jour4` | Classement du matériel de trail (indispensable / utile / pas indispensable) | 1080×1920 · 30 fps | 1 min 21 | 🧪 V7 (DA neutre) | Release `jour-4` | `out/Jour4-TikTok-V7-neutre.mp4` |
| `Jour5` | « Jour 5/22 » séance renfo : intro, sac, échauffement, circuit, corde à sauter | 1080×1920 · 30 fps | 63 s | 🟡 V2 | Release `jour-5` | `out/Jour5-TikTok-V2.mp4` (+ `-sans-musique`) |
| `Jour5Court` | Version courte du Jour 5 (ouverture dans l'action) | 1080×1920 · 30 fps | 22 s | 🧪 test | Release `jour-5` | `out/Jour5-COURT-V1-AVEC-MUSIQUE.mp4` / `-SANS-MUSIQUE` |
| `Jour6` | « Le D+ expliqué simplement » (Communauté, au bureau) | 1080×1920 · 30 fps | 49 s | 🟡 V1 | Release `jour-6` | `out/Denivele-V1-SANS-MUSIQUE.mp4` (+ `-AVEC-MUSIQUE`) |
| `Lent` | « Courir lentement pour progresser » (Communauté, au bureau) | 1080×1920 · 30 fps | 38 s | 🟡 V1 | Release `jour-1` | `out/Lent-V1-SANS-MUSIQUE.mp4` (+ `-AVEC-MUSIQUE`) |
| `Semaine` | « Combien de fois par semaine courir quand on débute » (Communauté) | 1080×1920 · 30 fps | 34 s | 🟡 V1 | Release `jour-2` | `out/Semaine-V1-SANS-MUSIQUE.mp4` (+ `-AVEC-MUSIQUE`) |
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

### Jour 4, V3 — bruitages
- Demande : ajouter des bruitages (clics, pops) pour plus de dynamisme, notamment quand les objets se rangent.
- Bruitages générés par `scripts/make_sfx.py` → `public/sfx/` : pop (aigu INDISPENSABLE / moyen UTILE / grave PAS INDISPENSABLE), whoosh + impact sur le hook, whoosh à l'apparition du tableau, ding sur « Abonne-toi ».
- Activés par `sfx: true` dans le montage. Vérifié : 12 pops alignés sur les verdicts, ~7 dB sous le niveau global.

### Jour 4, V4 — retours
- « On ne voit pas les objets » → à l'annonce de chaque objet, une **carte** (icône + nom) entre à droite du visage ; au verdict elle **vole** jusqu'à sa colonne, l'étiquette rebondit avec un flash jaune.
- « Pas d'animation de bruit au placement » → whoosh à l'arrivée de la carte, whoosh au départ du vol, **pop bien audible** (volume 0,9) à l'atterrissage.
- « Trop bref » → explications remises pour chaque objet (blancs > 0,35 s coupés) : 1 min 04 → 1 min 53.
- Icônes : Material Design Icons (Apache 2.0) dans `src/tiktok/icons.ts`, casquette dessinée à la main.
- Sous-titres refaits à partir du son monté (`subtitleTime: "output"`) puis relus à la main.

### Jour 4, V5 — retours
- « Garde pas tous les détails, alterne entre les deux » → verdict + **une** explication par objet : 1 min 53 → 1 min 21.
- Synchro vérifiée : son final retranscrit = temps des sous-titres (écart ≤ 0,1 s).

### 2026-11-17 — Jour 4, V6 : test DA « neutre », sans musique
- Musique électro supprimée de la vidéo **et du projet** (« plus jamais ce genre de son »). Vérifié : pendant les blancs, −58 dB (silence) au lieu de −41 dB.
- Nouvelle présentation « moins IA, plus naturelle » : Inter en casse normale, beige / marron / blanc + bleu, hook en simple phrase, sous-titres à ombre légère, tableau et cartes beiges, fondus doux, fin en pastille.
- Bruitages gardés mais plus discrets (pas d'impact au hook, pas de ding).
- Composition `Jour4Neutre` (`theme: "neutre"`).

### Jour 4, V7 — retours
- V6 avait modifié les textes (hook fusionné, libellés en minuscules) : **refusé**. V7 reprend **exactement** les textes de la V5 ; seule la présentation (police, couleurs, animations) change.
- Règle ajoutée dans `CLAUDE.md` et `DA.md` : un changement de DA ne touche jamais aux textes.

### 2026-11-17 — Jour 5, V1 (séance renfo)
- 11 rushs (Release `jour-5`), remis dans l'ordre de tournage par l'heure enregistrée. Intro montée 1 → 3 → 2 (la vidéo 2 commence par « mais avant ça » : elle suit logiquement la 3).
- Les vidéos du sac (tournées après la séance) placées juste après l'intro, comme demandé.
- Hook « Pas un seul kilomètre aujourd'hui… et pourtant, ça va piquer. » + « Jour 5/22 · prépa 1er trail ». « RENFO » révélé entre les mains au moment où elles s'ouvrent (5,15 → 6,35 s du rush).
- Carte « Le programme » synchronisée avec la voix ; échauffement (élastique, tête, hanches, genoux) ; circuit (squats, pompes, fentes, burpees, « 10 répétitions », « Circuit training · 5 tours ») ; corde à sauter « 5 × 1 minute » ; fin « Abonne-toi pour la suite ».
- Musique : « RetroFuture Clean » (Kevin MacLeod, funk-rock, sans synthé), montée d'énergie de 2:04 calée sur le premier plan d'action ; coupes sur les temps (92 BPM). Voix ~12 dB au-dessus de la musique dans l'intro. Version sans musique livrée aussi.
- Couvertures : `Couverture-Jour5-Renfo-V1.jpg` (geste RENFO) et `Couverture-Jour5-Saut-V1.jpg` (burpee en l'air).

### Jour 5, V2 — retours (« le reste tout est nickel »)
- Corde à sauter : l'ancien passage (30,5 → 36,4 s) contenait un raté → remplacé par **41,2 → 47,3 s**, vérifié image par image (régularité du mouvement la plus haute du rush, corde qui passe à chaque tour).
- Musique : « RetroFuture Clean » refusée (« ça donne pas envie ») → **« Hotrock »** (Kevin MacLeod, rock 128 BPM, batterie / basse / guitare / saxos, tonalité majeure), départ fort de 1:37 calé sur le premier plan d'action ; coupes recalées sur le nouveau tempo (mêmes plans, mêmes textes).

### Jour 5 — version courte (test « 100 vues »)
- Constat : les vidéos plafonnent à ~100 vues (TikTok + Insta) → test d'une version **22 s** qui démarre dans l'action.
- Ouverture sur le burpee avec le hook **affiché dès la 1re image** ; puis RENFO + « séance renfo, let's go ! » ; sac ; élastique ; squats / pompes / fentes / burpees (~2,3 s chacun) ; corde (passage sans raté) ; « Abonne-toi pour la suite ». Mêmes textes et même style que la version longue.
- Coupes sur les temps de « Hotrock » ; musique baissée pendant la phrase. Livré avec et sans musique.
- À faire : comparer les stats (durée moyenne, % regardé en entier, vues) avec la version longue.

### 2026-11-17 — Jour 6 : « Le D+ expliqué simplement » (V1)
- 14 rushs au bureau (Release `jour-6`), une phrase par prise. Prises retenues : hook r14, définition r02 (meilleure des 4), r05, r06, r07, r08, r10 (plus fluide que r09), r11 et r12 (2e prise à l'intérieur du fichier).
- Phrase « même si tu finis là où tu as commencé… » non tournée → montrée par le schéma (Départ / Arrivée au même niveau, D+ 500 / D– 500).
- Schémas animés synchronisés sur les mots : définition + flèche ; profil 10 km (montées bleues +100/+200/+200, compteur D+ → 500 m ; descentes marron, D– 500 m) ; immeuble qui se remplit jusqu'à 170 étages ; règle 100 m D+ ≈ +1 km ; calcul 10 km + 500 m D+ ≈ 15 km à plat ; checklist « les kilomètres / le D+ » ; question + « Abonne-toi pour la suite ».
- Mise en page : schémas en bas (torse), sous-titres sous le menton, visage jamais caché. Pops discrets. Livré sans musique (principal) + avec « Hotrock » très bas.
- Couvertures : `Couverture-Denivele-Hook-V1.jpg` (10 km ≠ 10 km), `Couverture-Denivele-Question-V1.jpg` (C'est quoi le D+ ? + mini profil).

### D+ — V2 + miniatures « pro »
- V2 : rafale de 14 petits « D+ » qui apparaissent un par un (« tic » sonore à chacun) sur « et c'est à cause de ça ».
- Miniatures refaites (« mes images ressemblent à rien ») : silhouette détourée sur fond beige + courbes de niveau + profil + énorme « D+ » bleu derrière + bandeau titre. `out/Miniature-Denivele-Doigts-V1.jpg`, `out/Miniature-Denivele-Question-V1.jpg`.

### 2026-11-17 — « Courir lentement pour progresser » (V1)
- 13 rushs (Release `jour-1`). Prises : hook r02 (trail en premier, pause sur « courir… »), r04, r06, r08 (2e prise), r09, r10 (2e moitié = prise complète), r12, r13 (2e prise). Phrase « récup / blessures » non tournée.
- Cadrage différent (tête basse, mur libre) → schémas EN HAUT, sous-titres au-dessus de la tête.
- Animations : « LENTEMENT » lettre par lettre (tic par lettre) ; pastille « Le secret des coureurs qui progressent » ; barre 80 % très facile / 20 % ; « = endurance fondamentale » ; test de la parole (✓ parler, chanter, faire des phrases / ✗ essoufflé → trop vite) ; moteur (muscles + cœur qui bat) ; 20 % séances dures « tu envoies » ; question + « Abonne-toi pour la suite ».
- Miniatures « pro » : `Miniature-Lent-Surpris-V1.jpg` (80/20 · Cours plus lentement), `Miniature-Lent-Explique-V1.jpg` (LENT · Tu cours trop vite). Composant générique `CoverPro` dans `src/tiktok/CoverJ6Pro.tsx`.

### « Courir lentement » V2 — hook plus punchy
- Retour : « le hook est trop mou, les gens s'endorment ». Nouveau hook : arrivée caméra (recul rapide) + whoosh/impact, blocs POUR ALLER / PLUS VITE / EN TRAIL, / IL FAUT COURIR… au rythme de la voix avec tics, puis avancée caméra + assombrissement + « LENTEMENT » qui claque (gros impact). Sous-titres masqués pendant le hook (le texte animé les remplace). Reste inchangé.

### 2026-11-17 — « Combien de fois par semaine » (V1)
- 6 rushs (Release `jour-2`), plusieurs phrases par prise. Prises : r01 (2e « tu débutes »), r02 (2e prise « super motivé »), r03, r04, r05 (sans le « pour ma part » tronqué), r06.
- Phrases non tournées (2-3 sorties, repos, progrès pendant le repos) → montrées par la carte « semaine type ».
- Hook punch (arrivée caméra, TU DÉBUTES ? / UN CONSEIL : / NE COURS PAS TOUS LES JOURS qui claque). Cartes : piège du débutant ; jauges souffle / muscles ; semaine type 2-3 sorties + repos, + 1 séance ; compteur « Ma prépa trail » 2 → 5 séances ; question + abonnement.
- Miniatures pro : `Miniature-Semaine-A-V1.jpg` (2-3× · Pas tous les jours !), `Miniature-Semaine-B-V1.jpg` (REPOS · Combien par semaine ?).

### « Combien par semaine » V2
- Sous-titres déplacés **en bas** et **agrandis** (Inter 700, 60 px, ombre plus marquée). Préférence enregistrée dans `CLAUDE.md`.

### Miniatures « Combien par semaine » V2 (photo retouchée)
- Demande : « améliore ma tête, les photos sont pourries ».
- Nouvelles images choisies dans les rushes : yeux ouverts, sourcils levés, bouche fermée, sans micro devant la bouche (r06 à 2,76 s, r04 à 2,14 s).
- Retouche naturelle : `scripts/retouche_portrait.py` (débruitage, balance chaude, ombres/cernes relevées, lissage doux de la peau, netteté légère) + détourage qui ne garde que la silhouette (plus de main coupée au bord). Photo descendue (imgTop −80) : le micro passe derrière le bandeau titre.
- Fichiers : `out/Miniature-Semaine-C-V2.jpg` (2-3×), `out/Miniature-Semaine-D-V2.jpg` (REPOS). Compositions `MiniatureSemaineC/D`.
- **À faire pour toutes les prochaines miniatures** : choisir l'image image par image (expression, yeux, pas de micro) et passer la photo dans `retouche_portrait.py`.

### Vidéo courte « 3 exercices genoux » V1 (format 15-20 s)
- Rushes : Release `jour-1` (IMG_8950 hook mimé, 8951 fentes, 8952 chaise au mur, 8953 montée sur chaise). **Pas de voix** → vidéo portée par le texte + bruitages.
- Montage `src/tiktok/Genoux.tsx` (18,8 s) : hook punch « MAL AUX / GENOUX ? » calé sur les bras en croix, « 3 EXERCICES » sur les 3 doigts, étiquettes d'exercice (numéro + nom + reps) en haut, à gauche pour la montée sur chaise (la tête monte en haut de l'image), points 1/3-3/3, fin « 2× par semaine · Enregistre la vidéo » + « Abonne-toi pour la suite ».
- Répétitions vérifiées image par image : fentes 5,75-10,75 s, chaise 6,5-10,5 s, montée 6,5-11 s (pas de raté).
- Sorties : `out/Genoux-V1-SANS-MUSIQUE.mp4`, `out/Genoux-V1-AVEC-MUSIQUE.mp4` (Hotrock), couvertures `out/Couverture-1-Genoux-V1.jpg` (bras en croix, GENOUX) et `out/Couverture-2-Genoux-V1.jpg` (fente, 3).
- Fiche de tournage : `docs/tournage-genoux.html` (https://claude.ai/artifact/R7D7gDZkjGjCuWZ38aoxZR).

### Jour 6/22 — premier run social à Saint-Paul, V1 (montage sobre)
- Rushes : Release `jour-6` (IMG_8957 → 8976 + photo de groupe IMG_8992). Demande : « sobre et classique, laisser les mots comme je les ai dits, belles coupes sur les blancs ».
- `src/tiktok/Run6.tsx` + `run6.data.ts` (59,8 s) : 8 plans face caméra coupés au mot près (sous-titres Inter 700 58 px en bas), pastille « Jour 6/22 · prépa 1er trail » au début, 8 plans d'ambiance (falaises, groupe, coucher de soleil) en fondus de 6 images avec le son d'ambiance bas, pastille « Run social · 1re édition », fin sur la photo de groupe + « Abonne-toi pour la suite ». Pas de musique, pas d'effets.
- Vérifié en re-transcrivant l'audio final : aucun mot coupé.
- Sortie : `out/Jour6-RunSocial-V1.mp4`.

### J-17 — vidéo de lancement de la série « premier trail » V1 (nouveau style naturel)
- Rushes : Release `jour-17` (prise face caméra assis sur une chaise rouge devant la canne, plans trail / montée / coucher de soleil / drone) + affiche de la course et tracé de la sortie de 18 km envoyés en image.
- La course s'appelle **Leu Trail des Musées** (26 km / 560 D+). Quentin dit « urban trail de Saint-Lieu, la première édition » → coupé (« je vais prendre le départ… d'un trail de 26 km ») et l'affiche est montrée à ce moment-là.
- `src/tiktok/J17.tsx` (30,8 s) : coupes sur les blancs, voix de la prise face caméra qui continue sur l'affiche, le tracé « 18 km », le sentier, la montée, le coucher de soleil et le drone ; « J-17 » seul texte de hook ; sous-titres simples sans animation ; aucun bruitage ; fondu au noir final.
- Vérifié en re-transcrivant l'audio final : phrases complètes, coupe invisible à l'oreille.
- Sortie : `out/J17-Lancement-V1.mp4` (20 Mo).
- **V2** : le tracé seul est remplacé par la capture Strava (18,00 km · 484 m D+ · 2 h 22 min). Sortie `out/J17-Lancement-V2.mp4`.
- **V3** (Quentin : « tous mes moments de bug », « écran noir avec le chrono, ça ressemble à rien ») : faux départs retirés (« Moi c'est… » et « Ça veut dire que… » dits deux fois — repérés en re-transcrivant AVEC les hésitations, prompt « euh… »), plan de la mer sur « j'habite sur l'île de La Réunion », stats Strava (tracé + 18,00 km · 484 m · 2 h 22) en surimpression sur le plan où il court face à la mer au lieu de l'écran noir, plans selfie montée/mer ajoutés, micro-fondus audio de 2 images à chaque coupe. Sortie `out/J17-Lancement-V3.mp4`.
- **Leçon** : toujours re-transcrire le rendu final avec un prompt d'hésitations pour détecter les répétitions ; ne jamais montrer une capture d'écran plein écran, la poser sur une vraie image.
- **V4** (Quentin : « moi c'est Quentin deux fois », « au début on entend n'importe quoi ») : piste son reconstruite en **8 phrases complètes**, chaque phrase extraite et re-transcrite SEULE avant montage (bornes posées dans les silences mesurés au 1/20 s) : plus de bruit d'assise avant « Il me reste 17 jours », plus de « Moi c'est… » / « Ça veut dire que… » en double, plus de coupe au milieu de « départ d'… » (phrase « je vais prendre le départ » retirée : « Le 6 décembre 2026, un trail de 26 km… » sur l'affiche). Le son ne redémarre plus aux changements d'image. Rendu final re-transcrit : chaque phrase une seule fois. Sortie `out/J17-Lancement-V4.mp4` (24,6 s, 18 Mo).
- **Méthode à garder** : 1) transcrire la prise par fenêtres avec prompt d'hésitations (VAD coupé) ; 2) choisir uniquement des phrases complètes ; 3) mesurer l'énergie autour de chaque borne ; 4) re-transcrire chaque morceau seul ; 5) re-transcrire le rendu final.
- **V5** (retours précis de Quentin, « tout le reste c'est bien ») : respiration de 0,35 s entre « Le 6 décembre 2026, » et « un trail de 26 km » (l'affiche arrive sur ce temps, plus de coupe « collée ») ; plan de la mer prolongé (silence de 1 s après « j'habite sur l'île de La Réunion ») ; plan Strava prolongé sur « Ça veut dire » (on ne voit plus le moment où il attend avant de parler) ; petit logo « + S'abonner » façon TikTok sur le drone à « n'hésite pas à t'abonner » (demandé par Quentin, exception à la règle « pas de bouton »). Sortie `out/J17-Lancement-V5.mp4` (26,4 s, 19 Mo).
- **V6** : phrase d'une traite « Le 6 décembre 2026, je vais prendre le départ d'un trail de 26 km avec plus de 500 m de D+ » (raccord testé à l'oreille-machine sur 8 combinaisons : fin à 34,33 s sur le « d » de « de l'Urbain », reprise à 37,28 s sur « un » → « départ d'un trail »). Plus de silence ajouté. Piste voix unique `public/videos/j17/voice.wav` montée à l'échantillon près (6 ms de fondu par phrase) au lieu de morceaux Remotion arrondis à l'image. Le raccord est caché sous l'affiche (qui arrive à « je vais prendre le départ »). Sortie `out/J17-Lancement-V6.mp4`.

### ✅ 20 nov 2026 — retour de Quentin : « Le réel a super bien marché » (J-17, lancement)
- **Format validé** : prise face caméra assis (chaise dehors, micro), voix qui continue sur de vraies images (mer, affiche, plan de course + stats Strava en surimpression, drone), phrase de série « Il me reste X jours pour être capable de courir 26 km » + « J-X » seul texte de hook, sous-titres simples, aucun bruitage ni animation, logo « + S'abonner » sur le dernier plan.
- **À reproduire** pour chaque vidéo de la série (J-16, J-15…). Le numéro = jour de PUBLICATION ; une vidéo par jour, publiée le jour même (le 19/11 : lancement l'après-midi + sortie le soir, tous deux en J-17).
- Méthode audio obligatoire : phrases complètes uniquement, bornes dans les silences, piste voix montée à l'échantillon près (`voice.wav`), re-transcription du rendu final avec prompt d'hésitations.

### J-16 — renfo avec le groupe Sport & Co 974 V1
- Rushes : Release `jour-16` (intro, présentation du groupe, plans de la séance sur la piste, bilan, infos pratiques).
- Nouveau composant réutilisable `src/tiktok/Episode.tsx` (format validé J-17) + données `src/tiktok/j16.data.ts` générées : 11 morceaux de phrases vérifiés un par un (retirés : « hum » après « l'animer », « Ça se place… », « euh » avant « C'était juste exceptionnel », deux hésitations dans « petit jeu ludique avec des abdos, avec un peu de culture générale »). Voix `public/videos/j16/voice.wav` (chaque rush nettoyé + normalisé avant montage). Plans de la séance muets sur « où on se rejoint… », le circuit, le jeu et le lieu ; visage sur le reste ; « J-16 » ; logo « + S'abonner » sur la dernière phrase.
- Rendu final re-transcrit : chaque phrase une seule fois, aucune hésitation. Sortie `out/J16-Renfo-V1.mp4` (37 s, 24 Mo).
- **V2** (Quentin : « améliorer le son de ma voix, qu'on entende moins autour ») : réduction de bruit spectrale non stationnaire (`noisereduce`, prop_decrease 0,9) sur chaque rush, puis passe-haut 100 Hz, coupe-haut 11 kHz, −2 dB à 220 Hz (moins sourd), +3 dB à 3,2 kHz (voix plus claire), de-esser, compresseur, porte de bruit douce, normalisation (‑16 LUFS, **‑ar 48000 obligatoire** sinon loudnorm sort en 192 kHz). Bruit de fond dans les pauses : −45 dB → −61 dB. Même montage, son remplacé. Sortie `out/J16-Renfo-V2.mp4`.
- **À appliquer par défaut** à toutes les prochaines vidéos (voix dehors).

### J-15 — 10 km en 4 blocs de 15 min V1
- Rushes : Release `jour-15` (intro dans la voiture, explication des blocs, plans pendant la course, « Xe bloc terminé » après chaque bloc, plans de fin face à la mer) + temps intermédiaires Strava (IMG_9084) et résultat (IMG_9086).
- Blocs reconstitués avec les temps cumulés : bloc 1 (0-15 min) = km 1-2 ; bloc 2 (15-30) = km 3-5 ; bloc 3 (30-45) = km 6-7 ; bloc 4 (45-60) = km 8-9 + 0,6 km. Vitesse = 60 / allure.
- `src/tiktok/J15.tsx` + `j15.data.ts` (50,6 s) : allures du bloc (« Km 3 · 5:57 /km · 10,1 km/h ») affichées pendant les images du bloc et la phrase « bloc terminé » ; résultat Strava (tracé + 9,68 km · 6:12 /km · 1 h 00) sur le dernier plan face à la mer ; voix nettoyée (noisereduce + EQ) ; « hum » retiré dans l'explication. Sortie `out/J15-Blocs-V1.mp4` (34 Mo).
- **V2** (Quentin : « ma voix fait très robot ») : la réduction de bruit spectrale (`noisereduce`) abîme la voix quand il y a beaucoup de vent (rushes en courant) → remplacée par un traitement doux : passe-haut 120 Hz (vent), `afftdn` léger (nr 8), EQ, compresseur doux, normalisation. Même montage. Sortie `out/J15-Blocs-V2.mp4`.
- **Règle** : plus de `noisereduce` agressif. Traitement voix par défaut = la chaîne douce ci-dessus ; un peu de bruit naturel vaut mieux qu'une voix robotique.
- **V3** (Quentin : « on sent le début de chaque vidéo, les blancs… coupe tout nickel ») : chaque prise face caméra recoupée au plus près de la parole avec l'enveloppe sonore au 1/20 s (début et fin de chaque prise, souffle/vent avant de parler retiré) ; pauses internes coupées (« EF, … ensuite », « Deuxième bloc fini. … Ça pique », « Troisième bloc terminé. … Plus que un », « Quatrième bloc. … C'est fini »). 50,6 s → 43,9 s. Sortie `out/J15-Blocs-V3.mp4`.
- **Règle** : toujours couper chaque prise de 0,05 s avant le premier mot à 0,05 s après le dernier, et réduire toute pause > 0,25 s.
