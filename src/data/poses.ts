import type { Pose } from "./types";

/**
 * The eight poses of the home page sun salutation animation, in sequence.
 * Each is drawn as a simple illustrated figure — skin-toned head and arms,
 * a two-tone top/legging outfit, and a small dark hair shape — in a shared
 * 200x230 viewBox so every pose lines up on the same "stage".
 *
 * The torso is built from two tapered trapezoid segments (wider at the
 * shoulder than the waist, wider again at the hip) rather than a
 * uniform-width stroke, so the garment reads as an actual tailored shape
 * instead of a straight bar.
 */
export const sunSalutationPoses: Pose[] = [
  {
    id: "tadasana",
    sanskrit: "Tadasana",
    english: "Mountain Pose",
    illustration: {
      head: { cx: 100, cy: 30, rx: 17, ry: 19 },
      torsoTop: { x1: 100, y1: 48, w1: 44, x2: 100, y2: 104, w2: 30 },
      torsoBottom: { x1: 100, y1: 104, w1: 30, x2: 100, y2: 145, w2: 38 },
      arms: [
        { x1: 75, y1: 58, x2: 75, y2: 130, width: 18 },
        { x1: 125, y1: 58, x2: 125, y2: 130, width: 18 },
      ],
      legs: [
        { x1: 100, y1: 145, x2: 84, y2: 214, width: 22 },
        { x1: 100, y1: 145, x2: 116, y2: 214, width: 22 },
      ],
    },
  },
  {
    id: "urdhva-hastasana",
    sanskrit: "Urdhva Hastasana",
    english: "Upward Salute",
    illustration: {
      head: { cx: 104, cy: 27, rx: 17, ry: 19 },
      torsoTop: { x1: 100, y1: 46, w1: 42, x2: 106, y2: 97, w2: 28 },
      torsoBottom: { x1: 106, y1: 97, w1: 28, x2: 105, y2: 145, w2: 36 },
      arms: [
        { x1: 99, y1: 54, x2: 65, y2: 10, width: 18 },
        { x1: 103, y1: 54, x2: 137, y2: 12, width: 18 },
      ],
      legs: [
        { x1: 105, y1: 145, x2: 90, y2: 214, width: 22 },
        { x1: 105, y1: 145, x2: 120, y2: 214, width: 22 },
      ],
    },
  },
  {
    id: "uttanasana",
    sanskrit: "Uttanasana",
    english: "Standing Forward Fold",
    illustration: {
      head: { cx: 90, cy: 200, rx: 17, ry: 19 },
      torsoTop: { x1: 99, y1: 152, w1: 26, x2: 92, y2: 196, w2: 22 },
      torsoBottom: { x1: 100, y1: 145, w1: 36, x2: 99, y2: 152, w2: 26 },
      arms: [{ x1: 100, y1: 150, x2: 60, y2: 206, width: 18 }],
      legs: [
        { x1: 100, y1: 145, x2: 84, y2: 214, width: 22 },
        { x1: 100, y1: 145, x2: 116, y2: 214, width: 22 },
      ],
    },
  },
  {
    id: "ardha-uttanasana",
    sanskrit: "Ardha Uttanasana",
    english: "Halfway Lift",
    illustration: {
      head: { cx: 158, cy: 100, rx: 17, ry: 19 },
      torsoTop: { x1: 122, y1: 130, w1: 26, x2: 152, y2: 108, w2: 22 },
      torsoBottom: { x1: 100, y1: 145, w1: 36, x2: 122, y2: 130, w2: 26 },
      arms: [{ x1: 148, y1: 112, x2: 122, y2: 144, width: 16 }],
      legs: [
        { x1: 100, y1: 145, x2: 84, y2: 214, width: 22 },
        { x1: 100, y1: 145, x2: 116, y2: 214, width: 22 },
      ],
    },
  },
  {
    id: "phalakasana",
    sanskrit: "Phalakasana",
    english: "Plank Pose",
    illustration: {
      head: { cx: 44, cy: 145, rx: 18, ry: 16 },
      torsoTop: { x1: 60, y1: 150, w1: 28, x2: 110, y2: 151, w2: 26 },
      torsoBottom: { x1: 110, y1: 151, w1: 26, x2: 165, y2: 152, w2: 24 },
      arms: [{ x1: 62, y1: 150, x2: 62, y2: 196, width: 18 }],
      legs: [{ x1: 163, y1: 152, x2: 188, y2: 192, width: 20 }],
    },
  },
  {
    id: "bhujangasana",
    sanskrit: "Bhujangasana",
    english: "Cobra Pose",
    illustration: {
      head: { cx: 76, cy: 127, rx: 18, ry: 19 },
      torsoTop: { x1: 84, y1: 150, w1: 26, x2: 123, y2: 139, w2: 30 },
      torsoBottom: { x1: 123, y1: 139, w1: 30, x2: 150, y2: 182, w2: 24 },
      arms: [{ x1: 68, y1: 196, x2: 84, y2: 150, width: 18 }],
      legs: [{ x1: 150, y1: 182, x2: 188, y2: 192, width: 20 }],
    },
  },
  {
    id: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Svanasana",
    english: "Downward-Facing Dog",
    illustration: {
      head: { cx: 60, cy: 186, rx: 17, ry: 18 },
      torsoTop: { x1: 86, y1: 148, w1: 26, x2: 107, y2: 127, w2: 24 },
      torsoBottom: { x1: 107, y1: 127, w1: 24, x2: 128, y2: 106, w2: 26 },
      arms: [{ x1: 50, y1: 200, x2: 86, y2: 148, width: 18 }],
      legs: [{ x1: 128, y1: 106, x2: 168, y2: 198, width: 20 }],
    },
  },
  {
    id: "uttanasana-return",
    sanskrit: "Uttanasana",
    english: "Forward Fold",
    illustration: {
      head: { cx: 90, cy: 200, rx: 17, ry: 19 },
      torsoTop: { x1: 99, y1: 152, w1: 26, x2: 92, y2: 196, w2: 22 },
      torsoBottom: { x1: 100, y1: 145, w1: 36, x2: 99, y2: 152, w2: 26 },
      arms: [{ x1: 100, y1: 150, x2: 60, y2: 206, width: 18 }],
      legs: [
        { x1: 100, y1: 145, x2: 84, y2: 214, width: 22 },
        { x1: 100, y1: 145, x2: 116, y2: 214, width: 22 },
      ],
    },
  },
];
