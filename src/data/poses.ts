import type { Pose } from "./types";

/**
 * The eight poses of the home page sun salutation animation, in sequence.
 * Each is drawn as a soft, faceless human silhouette (an oval head plus a
 * thick-stroked torso and limbs, all the same solid color) rather than a
 * thin stick figure, in a shared 200x230 viewBox so every pose lines up on
 * the same "stage".
 */
export const sunSalutationPoses: Pose[] = [
  {
    id: "tadasana",
    sanskrit: "Tadasana",
    english: "Mountain Pose",
    illustration: {
      head: { cx: 100, cy: 30, rx: 17, ry: 19 },
      torso: "M100,48 L100,145",
      limbs: ["M96,56 L82,130", "M104,56 L118,130", "M100,145 L84,214", "M100,145 L116,214"],
    },
  },
  {
    id: "urdhva-hastasana",
    sanskrit: "Urdhva Hastasana",
    english: "Upward Salute",
    illustration: {
      head: { cx: 104, cy: 27, rx: 17, ry: 19 },
      torso: "M100,46 Q110,96 105,145",
      limbs: ["M99,54 L68,12", "M103,54 L134,14", "M105,145 L90,214", "M105,145 L120,214"],
    },
  },
  {
    id: "uttanasana",
    sanskrit: "Uttanasana",
    english: "Standing Forward Fold",
    illustration: {
      head: { cx: 90, cy: 200, rx: 17, ry: 19 },
      torso: "M100,145 Q98,174 92,196",
      limbs: ["M100,145 L84,214", "M100,145 L116,214", "M100,150 L90,198", "M100,150 L104,200"],
    },
  },
  {
    id: "ardha-uttanasana",
    sanskrit: "Ardha Uttanasana",
    english: "Halfway Lift",
    illustration: {
      head: { cx: 158, cy: 100, rx: 17, ry: 19 },
      torso: "M100,145 L152,108",
      limbs: ["M100,145 L84,214", "M100,145 L116,214", "M148,112 L122,144"],
    },
  },
  {
    id: "phalakasana",
    sanskrit: "Phalakasana",
    english: "Plank Pose",
    illustration: {
      head: { cx: 44, cy: 145, rx: 18, ry: 16 },
      torso: "M60,150 L165,152",
      limbs: ["M62,150 L62,196", "M163,152 L188,192"],
    },
  },
  {
    id: "bhujangasana",
    sanskrit: "Bhujangasana",
    english: "Cobra Pose",
    illustration: {
      head: { cx: 76, cy: 127, rx: 18, ry: 19 },
      torso: "M84,150 Q128,112 150,182",
      limbs: ["M68,196 L84,150", "M150,182 L188,192"],
    },
  },
  {
    id: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Svanasana",
    english: "Downward-Facing Dog",
    illustration: {
      head: { cx: 67, cy: 168, rx: 17, ry: 18 },
      torso: "M86,148 L128,106",
      limbs: ["M52,198 L86,148", "M128,106 L168,198"],
    },
  },
  {
    id: "uttanasana-return",
    sanskrit: "Uttanasana",
    english: "Forward Fold",
    illustration: {
      head: { cx: 90, cy: 200, rx: 17, ry: 19 },
      torso: "M100,145 Q98,174 92,196",
      limbs: ["M100,145 L84,214", "M100,145 L116,214", "M100,150 L90,198", "M100,150 L104,200"],
    },
  },
];
