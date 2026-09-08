import { sunSalutationPoses } from "../../data/poses";

const CYCLE_SECONDS = 20;
const TOP_WIDTH = 27;
const BOTTOM_WIDTH = 30;
const ARM_WIDTH = 18;
const LEG_WIDTH = 22;

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
                    silhouette color.

                    Draw order: legs, then the torso block, then arms and
                    head on top — arms are usually the visually important,
                    distinctly-posed limb (reaching, supporting weight
                    overhead), so each pose's arm coordinates are chosen to
                    clear the torso's width rather than hiding under it. */}
                <g className="text-primary-800" stroke="currentColor">
                  {pose.illustration.legs.map((d) => (
                    <path key={d} d={d} strokeWidth={LEG_WIDTH} />
                  ))}
                </g>

                <path
                  d={pose.illustration.torsoBottom}
                  strokeWidth={BOTTOM_WIDTH}
                  stroke="currentColor"
                  className="text-primary-800"
                />
                <path
                  d={pose.illustration.torsoTop}
                  strokeWidth={TOP_WIDTH}
                  stroke="currentColor"
                  className="text-primary-600"
                />

                <g className="text-secondary-300" stroke="currentColor">
                  {pose.illustration.arms.map((d) => (
                    <path key={d} d={d} strokeWidth={ARM_WIDTH} />
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
