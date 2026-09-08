import { sunSalutationPoses } from "../../data/poses";

const CYCLE_SECONDS = 20;
const TORSO_WIDTH = 30;
const LIMB_WIDTH = 21;

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
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-full w-full"
              >
                {/* A soft, faceless silhouette: an oval head plus a thicker
                    torso stroke and thinner limb strokes, all one solid
                    color so they read as a single rounded human shape
                    rather than a thin stick figure. */}
                <path d={pose.illustration.torso} strokeWidth={TORSO_WIDTH} />
                {pose.illustration.limbs.map((d) => (
                  <path key={d} d={d} strokeWidth={LIMB_WIDTH} />
                ))}
                <ellipse
                  cx={pose.illustration.head.cx}
                  cy={pose.illustration.head.cy}
                  rx={pose.illustration.head.rx}
                  ry={pose.illustration.head.ry}
                  fill="currentColor"
                  stroke="none"
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
