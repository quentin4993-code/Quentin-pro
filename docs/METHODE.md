# Méthode de travail

Comment on passe d'une idée à une vidéo finie avec Remotion.

## 1. Brief
- **Objectif** : à quoi sert la vidéo ?
- **Public** : qui la regarde ?
- **Diffusion** : YouTube, Instagram, LinkedIn, site… (détermine le format)
- **Durée cible**

## 2. Script et storyboard
- Écrire le texte (voix off ou textes à l'écran).
- Découper en **scènes** : pour chacune, durée, contenu visuel, texte, animation.
- Vérifier que tout respecte la [direction artistique](DA.md).

## 3. Développement
- Une vidéo = une `<Composition>` déclarée dans `src/Root.tsx`.
- Une scène = un composant dans `src/scenes/`, placé dans le temps avec `<Sequence>` ou `<Series>`.
- Éléments réutilisables (titres, logos, fonds) dans `src/components/`.
- Couleurs et polices centralisées dans un fichier de thème (`src/theme.ts`) tiré de la DA.
- Animer avec `useCurrentFrame()`, `interpolate()` et `spring()` — jamais avec des animations CSS ou `setTimeout`.
- Médias (images, sons, vidéos) dans `public/`, chargés avec `staticFile()`.

## 4. Relecture
- `npm run dev` → ouvrir le Studio et regarder la vidéo en entier.
- Vérifier : rythme, lisibilité des textes, cohérence avec la DA, fautes.
- Corriger, puis relire à nouveau.

## 5. Rendu
- `npx remotion render <ID> out/<nom>.mp4`
- Vérifier le fichier final (son, qualité, durée).

## 6. Clôture
- Mettre à jour [SUIVI.md](SUIVI.md) (statut + journal).
- Commiter le code (les vidéos rendues dans `out/` ne sont pas versionnées).

## Formats courants

| Usage | Taille | FPS |
|---|---|---|
| YouTube / paysage | 1920×1080 | 30 |
| Reels / TikTok / Shorts | 1080×1920 | 30 |
| Post carré | 1080×1080 | 30 |
