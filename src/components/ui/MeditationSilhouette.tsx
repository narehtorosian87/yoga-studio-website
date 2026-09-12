/**
 * A single static, painterly silhouette of a seated meditation pose —
 * the home page hero image. Soft gradient shading, blurred edges, and a
 * faint grain give it a painted feel instead of a flat vector icon; no
 * facial detail, on purpose.
 */
export function MeditationSilhouette() {
  return (
    <svg viewBox="0 0 300 260" className="h-full w-full" role="img" aria-label="A seated figure in a meditation pose">
      <defs>
        <radialGradient id="silhouette-glow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#d2ddc4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d2ddc4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="silhouette-body" x1="10%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="#c3d2b3" />
          <stop offset="45%" stopColor="#8a9a80" />
          <stop offset="100%" stopColor="#4a5844" />
        </linearGradient>
        <filter id="silhouette-paint" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blurred" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.14 0"
            result="fadedNoise"
          />
          <feComposite in="fadedNoise" in2="blurred" operator="in" result="grain" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="grain" />
          </feMerge>
        </filter>
        <filter id="silhouette-soften" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <circle cx="150" cy="120" r="130" fill="url(#silhouette-glow)" />
      <ellipse cx="150" cy="223" rx="100" ry="11" fill="#3d3a34" opacity="0.16" filter="url(#silhouette-soften)" />

      <g filter="url(#silhouette-paint)" fill="url(#silhouette-body)">
        {/* One continuous, soft-edged silhouette: head, sloped shoulders,
            arms curving down to hands resting on the knees, and a wide
            seated cross-legged base. No separate joint shapes — a single
            path reads as a person, not a stick figure. */}
        <path
          d="M150,16
             C 165,16 176,28 176,44
             C 176,52 173,58 168,63
             C 179,66 189,71 196,79
             C 209,95 213,113 206,132
             C 202,144 202,155 210,163
             C 222,167 233,174 240,185
             C 249,199 251,213 246,224
             C 210,213 175,208 150,208
             C 125,208 90,213 54,224
             C 49,213 51,199 60,185
             C 67,174 78,167 90,163
             C 98,155 98,144 94,132
             C 87,113 91,95 104,79
             C 111,71 121,66 132,63
             C 127,58 124,52 124,44
             C 124,28 135,16 150,16 Z"
        />
      </g>
    </svg>
  );
}
