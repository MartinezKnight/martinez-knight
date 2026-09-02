import { motion } from "framer-motion";

const WIDTH = 1440;
const HEIGHT = 320;

/** Builds a sine-wave fill path across the given viewBox at a given phase (deg). */
function wavePath(amplitude: number, freq: number, phaseDeg: number, baseline: number) {
  const phase = (phaseDeg * Math.PI) / 180;
  const step = 12;
  let d = "";
  for (let x = 0; x <= WIDTH; x += step) {
    const y = baseline + amplitude * Math.sin((x / WIDTH) * freq * 2 * Math.PI + phase);
    d += (x === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
  }
  d += `L ${WIDTH},${HEIGHT} L 0,${HEIGHT} Z`;
  return d;
}

/** Four phase-shifted keyframes (0/90/180/270deg) loop seamlessly back to the start. */
function phases(amplitude: number, freq: number, baseline: number) {
  return [0, 90, 180, 270, 360].map((p) => wavePath(amplitude, freq, p, baseline));
}

const LAYERS = [
  { amplitude: 34, freq: 1.6, baseline: 175, duration: 10, opacity: 0.35, gradient: "wave-grad-1" },
  { amplitude: 44, freq: 2.1, baseline: 220, duration: 7.5, opacity: 0.5, gradient: "wave-grad-2" },
  { amplitude: 26, freq: 2.8, baseline: 260, duration: 5.5, opacity: 0.7, gradient: "wave-grad-3" },
];

export default function HeroWave() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-[300px] sm:h-[380px] md:h-[440px] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4e8" />
          <stop offset="100%" stopColor="#1a8fff" />
        </linearGradient>
        <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a8fff" />
          <stop offset="100%" stopColor="#00d4e8" />
        </linearGradient>
        <linearGradient id="wave-grad-3" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#00d4e8" />
          <stop offset="100%" stopColor="#1a8fff" />
        </linearGradient>
      </defs>
      {LAYERS.map((layer, i) => (
        <motion.path
          key={i}
          fill={`url(#${layer.gradient})`}
          opacity={layer.opacity}
          initial={false}
          animate={{ d: phases(layer.amplitude, layer.freq, layer.baseline) }}
          transition={{ duration: layer.duration, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
        />
      ))}
    </svg>
  );
}
