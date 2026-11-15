import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

export const ACCENT = "#FFD60A";
export const fontFamily = "Montserrat";

for (const weight of ["700", "800", "900"]) {
  loadFont({ family: fontFamily, url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`), weight });
}
