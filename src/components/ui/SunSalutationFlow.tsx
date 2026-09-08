import { sunSalutationPoses } from "../../data/poses";
import type { Limb, TaperedSegment } from "../../data/types";

const CYCLE_SECONDS = 20;

/** A trapezoid from (x1,y1) at width w1 to (x2,y2) at width w2, with a
 * small circle capping each end so the corners read as rounded rather
 * than sharp — a tailored garment shape instead of a straight bar. */
function tapered({ x1, y1, w1, x2, y2, w2 }: TaperedSegment) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const h1 = w1 / 2;
  const h2 = w2 / 2;
  const path = [
    `M${x1 + nx * h1},${y1 + ny * h1}`,
    `L${x2 + nx * h2},${y2 + ny * h2}`,
    `L${x2 - nx * h2},${y2 - ny * h2}`,
    `L${x1 - nx * h1},${y1 - ny * h1}`,
    "Z",
  ].join(" ");
  return { path, capStart: { cx: x1, cy: y1, r: h1 }, capEnd: { cx: x2, cy: y2, r: h2 } };
}

function TaperedShape({ segment }: { segment: TaperedSegment }) {
  const { path, capStart, capEnd } = tapered(segment);
  return (
    <>
      <circle cx={capStart.cx} cy={capStart.cy} r={capStart.r} fill="currentColor" />
      <circle cx={capEnd.cx} cy={capEnd.cy} r={capEnd.r} fill="currentColor" />
      <path d={path} fill="currentColor" />
    </>
  );
}

function LimbShape({ limb }: { limb: Limb }) {
  return (
    <path
      d={`M${limb.x1},${limb.y1} L${limb.x2},${limb.y2}`}
      stroke="currentColor"
      strokeWidth={limb.width}
      strokeLinecap="round"
      fill="none"
    />
  );
}

export function SunSalutationFlow() {
  const stepSeconds = CYCLE_SECONDS / sunSalutationPoses.length;

  return (
    <div className="relative mx-auto aspect-[4/4.6] w-full max-w-sm" aria-hidden="true">
      <div className="breath-ring absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_40%,theme(colors.primary.200),transparent_68%)]" />

      {sunSalutationPoses.map((pose, index) => {
        const delay = `${index * stepSeconds}s`;
        return (
          <div
            key={pose.id}
            className="pose-layer absolute inset-0 text-primary-700"
            style={{ animationDelay: delay }}
          >
            {/* Wrapped separately so the continuous idle sway (global.css)
                composes with this layer's own fade/scale-in transform
                instead of one animation overwriting the other. */}
            <div className="pose-figure h-full w-full">
              <svg
                viewBox="0 0 200 230"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-full w-full"
              >
                {/* A simple illustrated figure, faceless but recognizably
                    human: legging-colored legs and lower torso, a
                    top-colored chest/back, skin-toned bare arms and head,
                    and a small dark hair shape — instead of one flat
                    silhouette color. The torso is two tapered trapezoids
                    (wider at the shoulder than the waist, wider again at
                    the hip) rather than a uniform-width bar, so it reads
                    as a tailored garment.

                    Draw order: legs, then the torso block, then arms and
                    head on top — arms are usually the visually important,
                    distinctly-posed limb (reaching, supporting weight
                    overhead), so each pose's arm coordinates are chosen to
                    clear the torso's width rather than hiding under it. */}
                <g className="text-primary-800">
                  {pose.illustration.legs.map((limb, i) => (
                    <LimbShape key={i} limb={limb} />
                  ))}
                </g>

                <g className="text-primary-800">
                  <TaperedShape segment={pose.illustration.torsoBottom} />
                </g>
                <g className="text-primary-600">
                  <TaperedShape segment={pose.illustration.torsoTop} />
                </g>

                <g className="text-secondary-300">
                  {pose.illustration.arms.map((limb, i) => (
                    <LimbShape key={i} limb={limb} />
                  ))}
                </g>

                <ellipse
                  cx={pose.illustration.head.cx}
                  cy={pose.illustration.head.cy}
                  rx={pose.illustration.head.rx}
                  ry={pose.illustration.head.ry}
                  fill="currentColor"
                  className="text-secondary-300"
                />

                <circle
                  cx={pose.illustration.head.cx}
                  cy={pose.illustration.head.cy - pose.illustration.head.ry * 0.55}
                  r={pose.illustration.head.rx * 0.55}
                  fill="currentColor"
                  className="text-sand-800"
                />
              </svg>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 -bottom-1.5 text-center">
        {sunSalutationPoses.map((pose, index) => {
          const delay = `${index * stepSeconds}s`;
          return (
            <div key={pose.id} className="pose-name absolute inset-x-0" style={{ animationDelay: delay }}>
              <span className="block font-heading text-lg text-sand-900">{pose.sanskrit}</span>
              <span className="block text-xs uppercase tracking-wide text-sand-600">{pose.english}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
