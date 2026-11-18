"""Retouche d'un portrait (image tirée d'un rush) puis détourage pour les miniatures « pro ».

Usage : python3 scripts/retouche_portrait.py entree.png sortie-cut.png [sortie-retouche.jpg]

Étapes (naturelles, pas de filtre « beauté » exagéré) :
  1. débruitage léger (le capteur frontal en intérieur est bruité) ;
  2. balance des blancs légèrement chaude + contraste local (CLAHE) ;
  3. lissage doux de la peau uniquement (filtre bilatéral, masque peau) ;
  4. éclaircissement doux du visage / yeux, saturation +8 % ;
  5. netteté (masque flou) ;
  6. détourage rembg (u2net_human_seg) → PNG 1080×1920 transparent, silhouette principale seule.
"""
import sys

import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove


def retouche(bgr: np.ndarray) -> np.ndarray:
    img = cv2.fastNlMeansDenoisingColored(bgr, None, 4, 4, 7, 21)

    # balance des blancs (gray world adouci) + touche chaude
    f = img.astype(np.float32)
    means = f.reshape(-1, 3).mean(0)
    gray = means.mean()
    gains = 1 + 0.6 * (gray / means - 1)
    gains *= np.array([0.97, 1.0, 1.04])  # B, G, R
    f = np.clip(f * gains, 0, 255)

    # contraste local sur la luminance
    lab = cv2.cvtColor(f.astype(np.uint8), cv2.COLOR_BGR2LAB)
    L, A, B = cv2.split(lab)
    L = cv2.createCLAHE(clipLimit=1.1, tileGridSize=(8, 8)).apply(L)
    # courbe douce : ombres relevées (cernes moins marqués), hautes lumières protégées
    x = np.arange(256, dtype=np.float32) / 255
    curve = np.clip(255 * (x ** 0.88 + 0.12 * np.sin(np.pi * x) * (1 - x)), 0, 255).astype(np.uint8)
    L = cv2.LUT(L, curve)
    img = cv2.cvtColor(cv2.merge([L, A, B]), cv2.COLOR_LAB2BGR)

    # lissage peau (masque YCrCb), on garde les détails (yeux, barbe, cheveux)
    ycc = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    skin = cv2.inRange(ycc, (60, 135, 85), (255, 175, 130))
    skin = cv2.GaussianBlur(skin, (31, 31), 0).astype(np.float32)[..., None] / 255
    smooth = cv2.bilateralFilter(img, 13, 45, 11)
    img = (img * (1 - 0.65 * skin) + smooth * 0.65 * skin).astype(np.uint8)

    # saturation +8 %
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.08, 0, 255)
    img = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

    # netteté
    blur = cv2.GaussianBlur(img, (0, 0), 1.4)
    img = cv2.addWeighted(img, 1.3, blur, -0.3, 0)
    return img


def main():
    src, out_cut = sys.argv[1], sys.argv[2]
    out_jpg = sys.argv[3] if len(sys.argv) > 3 else None
    bgr = cv2.imread(src)
    bgr = cv2.resize(bgr, (1080, 1920), interpolation=cv2.INTER_AREA)
    bgr = retouche(bgr)
    if out_jpg:
        cv2.imwrite(out_jpg, bgr, [cv2.IMWRITE_JPEG_QUALITY, 93])
    rgb = Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))
    cut = remove(rgb, session=new_session("u2net_human_seg"), alpha_matting=True)
    # on ne garde que la silhouette principale (enlève une main coupée au bord, etc.)
    rgba = np.array(cut)
    n, lab, st, _ = cv2.connectedComponentsWithStats((rgba[..., 3] > 40).astype(np.uint8), 8)
    if n > 2:
        keep = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
        m = cv2.dilate((lab == keep).astype(np.uint8), np.ones((9, 9), np.uint8))
        rgba[..., 3] = rgba[..., 3] * m
    Image.fromarray(rgba).save(out_cut)


if __name__ == "__main__":
    main()
