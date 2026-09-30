/**
 * Procedural topographic contour lines. Deterministic, so server and client
 * render identical paths. Each ring draws itself in via stroke-dashoffset.
 */

type Hill = { cx: number; cy: number; rings: number; step: number; start: number; seed: number };

const round = (n: number) => Math.round(n * 10) / 10;

function ringPath(hill: Hill, ring: number) {
  const { cx, cy, step, start, seed } = hill;
  const radius = start + ring * step;
  const samples = 48;
  const points: [number, number][] = [];

  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const wobble =
      1 +
      0.14 * Math.sin(3 * t + seed + ring * 0.32) +
      0.07 * Math.sin(5 * t - seed * 1.7 + ring * 0.18) +
      0.035 * Math.sin(9 * t + seed * 0.6 - ring * 0.1);
    points.push([cx + Math.cos(t) * radius * wobble * 1.35, cy + Math.sin(t) * radius * wobble]);
  }

  // Closed Catmull-Rom spline → cubic Béziers for smooth, hand-drawn-looking rings
  let d = `M${round(points[0][0])},${round(points[0][1])}`;
  for (let i = 0; i < samples; i++) {
    const p0 = points[(i - 1 + samples) % samples];
    const p1 = points[i];
    const p2 = points[(i + 1) % samples];
    const p3 = points[(i + 2) % samples];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${round(c1x)},${round(c1y)} ${round(c2x)},${round(c2y)} ${round(p2[0])},${round(p2[1])}`;
  }
  return `${d} Z`;
}

const presets: Record<'hero' | 'footer' | 'band', Hill[]> = {
  hero: [
    { cx: 1180, cy: 260, rings: 15, step: 34, start: 18, seed: 1.2 },
    { cx: 120, cy: 820, rings: 8, step: 38, start: 30, seed: 4.1 },
  ],
  footer: [
    { cx: 1300, cy: 520, rings: 12, step: 36, start: 24, seed: 2.6 },
    { cx: 220, cy: -40, rings: 7, step: 40, start: 40, seed: 5.3 },
  ],
  band: [{ cx: 200, cy: 380, rings: 11, step: 36, start: 20, seed: 3.4 }],
};

export function Topo({
  variant = 'hero',
  className,
  animate = true,
}: {
  variant?: keyof typeof presets;
  className?: string;
  animate?: boolean;
}) {
  const hills = presets[variant];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className={`nh-contours pointer-events-none ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
    >
      {hills.map((hill, h) =>
        Array.from({ length: hill.rings }, (_, ring) => (
          <path
            key={`${h}-${ring}`}
            d={ringPath(hill, ring)}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            strokeWidth={ring % 5 === 4 ? 1.6 : 0.9}
            className={animate ? 'nh-contour-line' : undefined}
            style={animate ? { animationDelay: `${ring * 70 + h * 240}ms` } : undefined}
          />
        )),
      )}
    </svg>
  );
}

/** Dotted great-circle arc with a small plane, used to connect sections. */
export function FlightPath({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`nh-container ${className ?? ''}`}>
      <div className={`relative ${flip ? '-scale-x-100' : ''}`}>
        <svg viewBox="0 0 1200 120" className="h-16 w-full text-inkMuted sm:h-24" fill="none" preserveAspectRatio="none">
          <path
            d="M10 110 C 300 -20, 900 -20, 1150 60"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.5 9"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="absolute bottom-[8%] left-[0.8%] size-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-ground bg-signal" />
        <svg
          viewBox="0 0 24 24"
          className="absolute right-[4.2%] top-1/2 size-6 -translate-y-1/2 translate-x-1/2 text-ink"
          fill="currentColor"
        >
          <path
            d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            transform="rotate(105 12 12)"
          />
        </svg>
      </div>
    </div>
  );
}
