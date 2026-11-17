# Direction artistique — Vlogs TikTok « Prépa trail »

> **Référence obligatoire pour toutes les prochaines vidéos.**
> Tout ce qui est écrit ici a été **validé par Quentin** après 5 versions de la vidéo « Jour 3/22 ».
> Modèle de référence : composition `Jour3` (`src/tiktok/rush1.ts`).

---

## 1. Intention

- **Série** : préparation de mon premier trail officiel, « Jour X / 22 ».
- **Ton** : **pro, dynamique, sobre**. On doit donner envie de rester jusqu'au bout, sans faire « enfant » ni « bâclé ».
- **Principe** : la vidéo et la voix portent l'histoire. Les éléments graphiques sont **peu nombreux et utiles** (hook, sous-titres, compteur, ligne de parcours, fin).

---

## 2. Format

| Élément | Valeur |
|---|---|
| Format | Vertical TikTok **1080 × 1920**, 30 i/s |
| Durée | ~40–45 s (on garde l'essentiel, on coupe les pauses) |
| Export | `out/JourX-TikTok-VN.mp4` — **toujours un numéro de version différent** dans le nom |

---

## 3. Couleurs et police

| Rôle | Valeur |
|---|---|
| Accent | Jaune **`#FFD60A`** |
| Texte | Blanc `#FFFFFF` |
| Contours / fonds | Noir |
| Police | **Montserrat** (700, 800, 900), embarquée dans `public/fonts/` |

Pas d'autre couleur. Le jaune est réservé aux **éléments graphiques** (hook, compteur, ligne de parcours, bouton de fin) — **jamais dans les sous-titres**.

---

## 4. Les éléments validés (à garder sur chaque vidéo)

### Hook (0 à ~3 s) ✅ « super cool »
- 3 blocs en haut de l'écran :
  1. Bloc **blanc** texte noir (Montserrat Black ~64 px) — ex. « 22 JOURS POUR PRÉPARER »
  2. Bloc **jaune** texte noir, plus gros (~102 px), légèrement penché et qui ondule — ex. « MON 1ER TRAIL »
  3. Petite ligne sur fond noir transparent — ex. « Jour 3 : j'ai déjà mal aux jambes… »
- Animation : les blocs tombent l'un après l'autre avec une **petite secousse** à l'impact, puis fondu de sortie.
- Si la vidéo source contient déjà un texte incrusté (ex. « JOUR 3/22 »), **l'effacer** (voir Méthode) : pas de répétition.

### Sous-titres ✅
- **Format classique** : texte blanc, gras (Montserrat 800, ~72 px), **contour noir épais**, centré, en bas (au-dessus de la ligne de parcours).
- Phrase par phrase (3 à 6 mots), petite apparition en douceur.
- **Aucun mot en jaune, aucun mot surligné.**
- Texte transcrit automatiquement puis **corrigé** (fautes, répétitions « mais… mais » supprimées).

### Compteur « IL RESTE X KM » ✅
- Petit encadré noir bordé de jaune, en haut à droite, qui glisse depuis la droite et compte de 0 à X.
- Apparaît quand je dis la distance qui reste.

### Ligne de parcours en bas ✅
- Tracé départ → arrivée (petites collines), pointillés blancs, partie parcourue en **jaune**.
- Point qui avance avec une bulle « X,X KM ».
- Étiquettes **DÉPART** / **ARRIVÉE**, drapeau à l'arrivée qui passe en jaune avec « 10 KM ✓ ».
- Passe à mi-distance quand je dis « on est à la moitié ».
- C'est **la seule jauge** de la vidéo (pas de doublon en haut).

### Fin ✅ « super cool »
- Récap Strava de la vidéo d'origine.
- Bouton **jaune** « **Abonne-toi pour la suite** » (ou équivalent court), qui pulse, + **flèche** blanche qui rebondit.
- ❌ Pas de « pour suivre les 22 jours » : ça ne sert à rien.
- La ligne de parcours s'efface juste avant.

### Couverture TikTok ✅
- Image fixe 1080×1920 tirée de la vidéo (`src/tiktok/Cover.tsx`, compositions `CoverJourX…`).
- Même style que le hook : bloc **blanc** « JOUR X / 22 » (~150 px), bloc **jaune** « PRÉPA 1ER TRAIL » penché (⚠️ jamais « MON 1ER TRAIL » seul : je **prépare** mon trail, je ne le cours pas encore), petite ligne sur fond noir (distance + accroche).
- Texte placé là où il ne cache pas le visage (en haut sur le ciel, ou en bas), toujours dans la zone centrale 3:4 visible sur la grille du profil (y 240–1680).
- Proposer 2 options : un **plan d'action** (course) et un **gros plan visage**.

### Vidéos sans course (face caméra, conseils, classement) — proposé Jour 4
- Pas de ligne de parcours ni de compteur km.
- **Tableau de classement** sobre en haut (sous les onglets TikTok) : 3 colonnes INDISPENSABLE (jaune) / UTILE (blanc) / PAS INDISPENSABLE (noir) ; chaque objet apparaît au moment du verdict ; « entre les deux » = étiquette en pointillés à cheval.
- Quand un objet est annoncé : **carte avec icône** à côté du visage, qui **vole** se ranger dans sa colonne au verdict (+ pop).
- Par objet : **verdict + une seule explication** (la plus parlante). Ni trop bref (1 min 04 = « très bref »), ni tout garder (1 min 53 = trop). Jour 4 validé à ~1 min 20.

---

## 5. Montage

- **Face caméra** : coupes franches sur les pauses et hésitations. Pas de zoom.
- **Paysages (B-roll)** : plans de **1,5 à 3,5 s** — pas plus courts. On laisse le temps de voir.
- **Transitions** : fondu court (6 images) entre les plans de paysage ; coupe nette ailleurs.
- **Rythme** : face caméra → paysages → face caméra → paysages → récap. On ne garde que les meilleurs moments.

---

## 6. Son

- **Voix** : nettoyée et normalisée (−14 LUFS), toujours bien audible.
- **Musique : aucune.** ❌ Plus jamais de musique électro (« Raving Energy », musiques synthétisées) : « nulle ». Les vidéos sont livrées sans musique ; Quentin ajoute un **son tendance dans l'appli**.
- **Bruitages** : pop à chaque objet rangé, whoosh léger à l'arrivée des cartes. En DA neutre : plus discrets, pas d'impact sur le hook, pas de ding final.

---

## 6 bis. 🧪 DA « neutre » (test Jour 4 V6 — en attente d'avis)
Objectif : « moins IA, plus naturel », neutre et classique.
- **Police** : Inter (400–700).
- **Couleurs** : beige `#F4EEE4`, marron `#4E3B2C`, blanc, touche de bleu `#3E6A9E`. Pas de jaune vif.
- **Textes : identiques** à la version d'origine (même hook, mêmes libellés, même fin). Changer la DA = changer **seulement** police, couleurs, animations.
- **Hook** : les mêmes 3 textes, en blanc avec ombre douce + petite pastille beige pour la 3e ligne. Fondu doux, pas de blocs, pas de secousse.
- **Sous-titres** : blanc, Inter 600, ombre légère (pas de gros contour noir).
- **Tableau / cartes** : panneau beige clair, texte marron, cartes beiges sans bordure ; glissements et fondus, pas de rebond ni de rotation.
- **Fin** : pastille beige « Abonne-toi pour la suite », sans flèche qui rebondit.
- Code : `src/tiktok/neutre.tsx`, `src/tiktok/TierBoardNeutre.tsx`, option `theme: "neutre"`.

---

## 7. ❌ À NE PLUS FAIRE

| Interdit | Pourquoi |
|---|---|
| Écrire « Jour X/22 » sur une vidéo **Communauté** (conseils, classement…) | « Ça n'a rien à voir » (Jour 4). OK sur les vidéos **Défi**. |
| « Abonne-toi pour suivre les 22 jours » | Inutile → « Abonne-toi pour la suite » |
| Zooms (transitions, faux changements de plan, zooms lents sur les paysages) | Trop, rendu bâclé |
| Flashs blancs, flous de transition | Trop |
| Secousses de l'image dans la vidéo | Trop (seule exception : l'impact du hook) |
| Plans de moins de 1,5 s | « Vidéos trop courtes », bâclé |
| Gros textes « motivation » sur les paysages (« C'EST PARTI », « CAP SUR L'OCÉAN », « LES 5 DERNIERS KM », « ON NE LÂCHE RIEN »…) | « De la merde », fait enfant |
| Mots en jaune / surlignés dans les sous-titres | « T'en mets à tout va » |
| Deux jauges de progression (ex. carte « MI-PARCOURS » en haut + ligne en bas) | Doublon inutile |
| Barre de progression en haut de l'écran | Remplacée par la ligne de parcours |
| Texte déjà incrusté dans la vidéo source + hook | Répétition |
| Musique synthétisée maison | Nulle |
| **Musique électro** (« Raving Energy » ou du même genre) | « Nulle, plus jamais » |
