import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, fontFamily } from "./style";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Sortie commune : petit zoom + fondu sur les 5 dernières images
const useExit = (frames: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [frames - 5, frames], [1, 0], clamp);
};

// ---------- Gros texte qui « claque » mot par mot ----------
export const Slam: React.FC<{ words: string[]; frames: number }> = ({ words, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit = useExit(frames);
  const step = Math.max(4, Math.floor((frames * 0.5) / words.length));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit }}>
      {words.map((w, i) => {
        const start = i * step;
        const s = spring({ frame: frame - start, fps, config: { damping: 9, stiffness: 260, mass: 0.6 } });
        const visible = frame >= start;
        const isLast = i === words.length - 1;
        return (
          <div
            key={i}
            style={{
              fontFamily,
              fontWeight: 900,
              fontSize: isLast ? 150 : 110,
              lineHeight: 1,
              color: isLast ? ACCENT : "white",
              WebkitTextStroke: "12px black",
              paintOrder: "stroke fill",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
              opacity: visible ? 1 : 0,
              transform: `scale(${interpolate(s, [0, 1], [2.4, 1])}) rotate(${(i % 2 ? 3 : -3) * (1 - s)}deg)`,
              marginTop: 6,
            }}
          >
            {w}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- Compteur animé (ex : 0 → 10 KM) ----------
export const Counter: React.FC<{ value: number; unit: string; label: string; frames: number }> = ({ value, unit, label, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const count = interpolate(frame, [4, 22], [0, value], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const exit = useExit(frames);
  return (
    <AbsoluteFill style={{ alignItems: "flex-end", paddingTop: 230, paddingRight: 50, opacity: exit }}>
      <div
        style={{
          transform: `translateX(${interpolate(enter, [0, 1], [500, 0])}px) rotate(3deg)`,
          backgroundColor: "black",
          borderRadius: 26,
          padding: "18px 30px",
          fontFamily,
          color: "white",
          boxShadow: `0 0 0 6px ${ACCENT}`,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2, opacity: 0.85 }}>{label}</div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, color: ACCENT }}>
          {Math.round(count)}
          <span style={{ fontSize: 50, marginLeft: 8 }}>{unit}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Jauge de parcours (ex : 5 / 10 KM) ----------
export const Progress: React.FC<{ done: number; total: number; unit: string; frames: number }> = ({ done, total, unit, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15 } });
  const fill = interpolate(frame, [6, 30], [0, done / total], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const exit = useExit(frames);
  const W = 760;
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 250, opacity: exit }}>
      <div
        style={{
          transform: `translateY(${interpolate(enter, [0, 1], [-300, 0])}px)`,
          backgroundColor: "rgba(0,0,0,0.75)",
          borderRadius: 28,
          padding: "22px 34px 30px",
          fontFamily,
          color: "white",
          width: W + 68,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 44 }}>
          <span>MI-PARCOURS</span>
          <span style={{ color: ACCENT }}>
            {Math.round(fill * total)} / {total} {unit}
          </span>
        </div>
        <div style={{ position: "relative", marginTop: 18, height: 26, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.25)" }}>
          <div style={{ position: "absolute", inset: 0, width: `${fill * 100}%`, borderRadius: 13, backgroundColor: ACCENT }} />
          {/* le coureur */}
          <div
            style={{
              position: "absolute",
              top: -14,
              left: `calc(${fill * 100}% - 27px)`,
              width: 54,
              height: 54,
              borderRadius: 27,
              backgroundColor: "white",
              border: `6px solid ${ACCENT}`,
              transform: `translateY(${Math.abs(Math.sin(frame / 2.5)) * -8}px)`,
            }}
          />
          {/* drapeau d'arrivée */}
          <div style={{ position: "absolute", right: -6, top: -40, fontSize: 40, fontWeight: 900 }}>🏁</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Décalage de tremblement (à appliquer sur l'image)
export const shakeOffset = (frame: number, start: number, frames: number) => {
  if (frame < start || frame >= start + frames) return { x: 0, y: 0, r: 0 };
  const t = frame - start;
  const k = 1 - t / frames; // s'atténue
  return {
    x: Math.sin(t * 2.1) * 14 * k,
    y: Math.cos(t * 2.7) * 10 * k,
    r: Math.sin(t * 1.7) * 0.8 * k,
  };
};
