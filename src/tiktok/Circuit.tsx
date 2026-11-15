import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { getLength, getPointAtLength } from "@remotion/paths";
import { ACCENT, fontFamily } from "./style";

// Profil du parcours (petites collines), dans une boîte de 860 x 110
const W = 860;
const H = 110;
const PATH = "M 20 80 C 90 80 120 40 190 45 S 290 85 360 70 S 460 20 540 30 S 640 80 710 65 S 800 40 840 50";
const LEN = getLength(PATH);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Ligne de parcours en bas de l'écran : départ → arrivée.
 * `progress` (0 → 1) et `km` sont calculés par la composition.
 * `finishFrame` = image où l'on atteint l'arrivée ; `hideFrom` = image où la ligne s'efface.
 */
export const Circuit: React.FC<{
  progress: number;
  km: number;
  totalKm: number;
  finishFrame: number;
  hideFrom: number;
}> = ({ progress, km, totalKm, finishFrame, hideFrom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const exit = interpolate(frame, [hideFrom, hideFrom + 8], [1, 0], clamp);
  const arrived = spring({ frame: frame - finishFrame, fps, config: { damping: 10, stiffness: 200 } });

  const at = (l: number) => getPointAtLength(PATH, l) ?? { x: 0, y: 0 };
  const p = at(Math.max(0.01, progress * LEN));
  const start = at(0);
  const end = at(LEN);
  const bob = Math.abs(Math.sin(frame / 4)) * -5 * (progress < 1 ? 1 : 0);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 330 }}>
      <div
        style={{
          position: "relative",
          width: W,
          height: H + 54,
          opacity: enter * exit,
          transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
        }}
      >
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: 34, left: 0, overflow: "visible" }}>
          {/* tracé complet */}
          <path d={PATH} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={16} strokeLinecap="round" />
          <path d={PATH} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />
          {/* partie parcourue */}
          <path
            d={PATH}
            fill="none"
            stroke={ACCENT}
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray={`${progress * LEN} ${LEN}`}
          />
          {/* départ */}
          <circle cx={start.x} cy={start.y} r={11} fill="white" stroke="black" strokeWidth={4} />
          {/* arrivée */}
          <g transform={`translate(${end.x} ${end.y}) scale(${1 + arrived * 0.35})`}>
            <line x1={0} y1={0} x2={0} y2={-46} stroke="white" strokeWidth={5} />
            <rect x={0} y={-46} width={30} height={20} fill={progress >= 1 ? ACCENT : "white"} stroke="black" strokeWidth={2} />
            <circle r={9} fill={progress >= 1 ? ACCENT : "white"} stroke="black" strokeWidth={4} />
          </g>
          {/* coureur */}
          <g transform={`translate(${p.x} ${p.y + bob})`}>
            <circle r={17} fill={ACCENT} opacity={0.35} />
            <circle r={11} fill="white" stroke={ACCENT} strokeWidth={6} />
          </g>
        </svg>

        {/* étiquettes */}
        <Label x={start.x} y={H + 40} text="DÉPART" />
        <Label x={end.x} y={H + 40} text="ARRIVÉE" highlight={progress >= 1} />
        {/* bulle km au-dessus du coureur */}
        <div
          style={{
            position: "absolute",
            left: p.x,
            top: p.y + bob - 20,
            transform: "translate(-50%, -100%)",
            fontFamily,
            fontWeight: 900,
            fontSize: 34,
            color: "black",
            backgroundColor: progress >= 1 ? ACCENT : "white",
            padding: "4px 12px",
            borderRadius: 10,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
          }}
        >
          {progress >= 1 ? `${totalKm} KM ✓` : `${km.toFixed(1).replace(".", ",")} KM`}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Label: React.FC<{ x: number; y: number; text: string; highlight?: boolean }> = ({ x, y, text, highlight }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: "translateX(-50%)",
      fontFamily,
      fontWeight: 900,
      fontSize: 28,
      letterSpacing: 1.5,
      color: highlight ? ACCENT : "white",
      WebkitTextStroke: "6px black",
      paintOrder: "stroke fill",
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);
