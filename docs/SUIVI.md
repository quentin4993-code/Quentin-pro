# Suivi du projet

> Mettre à jour à chaque session de travail.

## État actuel

| Élément | Statut |
|---|---|
| Installation Remotion | ✅ Fait (v4.0.543) |
| Composition de test `HelloWorld` | ✅ Fait |
| Direction artistique | 🟡 À définir — voir [DA.md](DA.md) |
| Envoi des rushes (Releases GitHub) | ✅ Fait — `rushes-1` |
| Première vraie vidéo (`Jour3`) | ✅ Version 1 rendue — en attente de retours |

Légende : ✅ fait · 🟡 en cours · ⬜ à faire · ⛔ bloqué

## Vidéos

| ID composition | Sujet | Format | Durée | Statut | Notes |
|---|---|---|---|---|---|
| `Jour3` | Vlog course « Jour 3/22 » : hook, sous-titres, musique, montage dynamique | 1080×1920 · 30 fps | 38 s | 🟡 V1 | Source : `rushes-1` |
| `HelloWorld` | Test d'installation | 1920×1080 · 30 fps | 5 s | ✅ | À supprimer plus tard |

## Prochaines étapes

- [ ] Remplir la direction artistique (couleurs, polices, ton)
- [ ] Choisir le sujet de la première vidéo
- [ ] Écrire le script / storyboard

## Journal

### 2026-11-15
- Installation de Remotion, React et TypeScript.
- Création de la composition `HelloWorld` et rendu de test réussi.
- Création des fichiers `SUIVI.md`, `METHODE.md` et `DA.md`.
- Rushes envoyés via les Releases GitHub (tag `rushes-1`) : `rush1.mov`, 51 s, vertical 2160×3840, vlog course à pied « JOUR 3/22 ».
- Les vidéos lourdes ne sont pas versionnées dans git : elles sont stockées dans les Releases et téléchargées dans `public/videos/`.

### 2026-11-15 (suite)
- Transcription automatique de la voix (Whisper) pour les sous-titres.
- Musique libre de droits générée par `scripts/make_music.py` (120 BPM, La mineur) → `public/music/run-beat.mp3`.
- Montage `Jour3` : 51 s → 38 s, coupes des pauses, zooms, plans de paysage raccourcis, hook, sous-titres, barre de progression, appel à s'abonner.
- Voix normalisée (−14 LUFS) pour être au même niveau que la musique.
- Rendu : `npx remotion render Jour3 out/jour3-tiktok.mp4`.
