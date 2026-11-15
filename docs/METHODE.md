# Méthode de travail — d'un rush à la vidéo TikTok finie

> À suivre pour chaque nouveau jour de la série. Style : voir [DA.md](DA.md).

---

## 1. Envoyer la vidéo (Quentin)

Les vidéos sont trop lourdes pour GitHub classique (25 Mo max). On passe par les **Releases** (jusqu'à 2 Go par fichier).

👉 **Raccourci : https://claude.ai/artifact/RYnegRCEi893sVQPtRhuJx** (page « Envoyer mes rushes », source `tools/envoyer-videos.html`).
Taper le numéro du jour → gros bouton jaune → la page d'envoi GitHub s'ouvre déjà remplie (nom `jour-X`, ou `rushes-AAAAMMJJ-HHMM` sans numéro).

Sinon, à la main :

1. Ouvrir dans Safari (pas dans l'appli GitHub), en remplaçant `N` par le numéro suivant :
   `https://github.com/quentin4993-code/Quentin-pro/releases/new?tag=rushes-N&title=Rushes%20N`
2. Si la page s'affiche mal sur iPad/iPhone : « aA » → **Demander le site pour ordinateur**.
3. Tout en bas, zone **« Attach binaries… »** → choisir la ou les vidéos → attendre la fin du chargement.
4. Bouton vert **Publish release**.
5. Prévenir Claude avec : **numéro du jour**, **distance du jour**, et ce qui est spécial dans la vidéo.

⚠️ Le dépôt est **public** : les vidéos envoyées sont visibles par tout le monde.

Déjà envoyé : `rushes-1` → Jour 3.

---

## 2. Récupérer et préparer la vidéo (Claude)

```bash
# télécharger depuis la Release (lien donné par l'API GitHub)
curl -L -o public/videos/rushN.mov "<browser_download_url>"

# 1080x1920, 30 i/s, voix normalisée ; DELOGO efface un texte incrusté (x:y:largeur:hauteur:jusqu'à_s)
DELOGO="160:235:720:135:3.05" scripts/prepare_rush.sh public/videos/rushN.mov public/videos/rushN.mp4
```

- Les vidéos ne sont **pas** commitées (ignorées par git) : l'original reste dans la Release.
- Regarder la vidéo : planche d'images toutes les secondes (`ffmpeg ... fps=1,tile`) + détection des changements de plan (`select='gt(scene,0.25)'`).
- Repérer : face caméra, paysages, récap Strava, texte incrusté éventuel à effacer.

## 3. Transcrire la voix (Claude)

- **faster-whisper**, modèle `medium`, français, horodatage mot par mot.
- Nécessite l'environnement cloud **« Quentin-pro »** (autorise huggingface.co, ses serveurs de fichiers et incompetech.com).
- Lancer avec `HF_HUB_DISABLE_XET=1` et donner l'audio en WAV 16 kHz lu avec numpy.
- Corriger le texte à la main (fautes, répétitions).

## 4. Monter (Claude)

1. Copier `src/tiktok/rush1.ts` → `src/tiktok/rushN.ts` et remplir :
   - `hook` : 3 textes (blanc / jaune / petite ligne) ;
   - `clips` : liste des plans (secondes dans la source) — face caméra coupé sur les pauses, paysages de 1,5 à 3,5 s ;
   - `subtitles` : phrases de 3 à 6 mots, **sans étoiles** (pas de jaune) ;
   - `callouts` : seulement le **compteur** « IL RESTE X KM » ;
   - `route` : `totalKm` + repères (0 km après le hook, mi-distance quand je le dis, arrivée au récap Strava) ;
   - `cta` : « Abonne-toi pour suivre les 22 jours ».
2. Déclarer la composition `JourX` dans `src/Root.tsx` (musique : `music/raving-energy.mp3` ou une autre validée).
3. Vérifier le style avec des images fixes : `npx remotion still JourX ... --frame=N`.

## 5. Rendre et livrer (Claude)

```bash
npx remotion render JourX out/jourX-tiktok.mp4 --crf=20
# version légère pour le téléphone
ffmpeg -i out/jourX-tiktok.mp4 -c:v libx264 -preset slow -crf 23 -maxrate 7M -bufsize 14M \
  -c:a aac -b:a 192k -movflags +faststart out/JourX-TikTok-V1.mp4
```

- Dans le cloud, ajouter `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
- Vérifier le son (voix audible, musique bien dosée) et une planche d'images de la vidéo finale.
- **Nom de fichier avec numéro de version** (`-V1`, `-V2`…), sinon l'appli peut montrer une ancienne version.
- Envoyer le fichier à Quentin + rappeler le **crédit musique** pour la description.

## 5 bis. Couverture TikTok (Claude)

```bash
# extraire l'image de fond (choisir un moment : course ou gros plan visage)
ffmpeg -ss <seconde> -i public/videos/rushN.mov -frames:v 1 -vf scale=1080:1920:flags=lanczos -q:v 2 public/covers/jourX-<seconde>.jpg
# déclarer un <Still> CoverJourX… dans src/Root.tsx (props : bg, day, highlight, sub, position "top"/"bottom")
npx remotion still CoverJourXCourse out/Couverture-JourX-Course.png
```
Convertir en JPG et envoyer les 2 options à Quentin.

## 6. Clôture

- Mettre à jour [SUIVI.md](SUIVI.md) (statut + journal) et [DA.md](DA.md) si un nouveau retour change le style.
- Commit + push sur la branche de travail.

---

## Outils du projet

| Fichier | Rôle |
|---|---|
| `src/tiktok/TikTokEdit.tsx` | Composition TikTok (plans, fondus, hook, sous-titres, compteur, fin, musique) |
| `src/tiktok/Circuit.tsx` | Ligne de parcours en bas |
| `src/tiktok/Animations.tsx` | Compteur (et anciennes animations non utilisées) |
| `src/tiktok/style.ts` | Couleur d'accent + police Montserrat |
| `src/tiktok/rush1.ts` | Montage du Jour 3 = **modèle** pour les suivants |
| `scripts/prepare_rush.sh` | Préparation des rushes (format, voix, effacement de texte) |
| `public/music/` | Musiques + `CREDITS.md` |
| `scripts/make_music.py` | Ancien générateur de musique (abandonné) |

## Formats courants

| Usage | Taille | FPS |
|---|---|---|
| Reels / TikTok / Shorts | 1080×1920 | 30 |
| YouTube / paysage | 1920×1080 | 30 |
| Post carré | 1080×1080 | 30 |
