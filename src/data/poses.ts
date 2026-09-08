import type { Pose } from "./types";

/**
 * The eight poses of the home page sun salutation animation, in sequence.
 * Each is drawn as a simple illustrated figure — skin-toned head and arms,
 * a two-tone top/legging outfit, and a small dark hair shape — rather than
 * a single-color silhouette, in a shared 200x230 viewBox so every pose
 * lines up on the same "stage".
 */
export const sunSalutationPoses: Pose[] = [
  {
    id: "tadasana",
    sanskrit: "Tadasana",
    english: "Mountain Pose",
    illustration: {
      head: { cx: 100, cy: 30, rx: 17, ry: 19 },
      torsoTop: "M100,48 L100,104",
      torsoBottom: "M100,104 L100,145",
      arms: ["M82,58 L82,130", "M118,58 L118,130"],
      legs: ["M100,145 L84,214", "M100,145 L116,214"],
    },
  },
  {
    id: "urdhva-hastasana",
    sanskrit: "Urdhva Hastasana",
    english: "Upward Salute",
    illustration: {
      head: { cx: 104, cy: 27, rx: 17, ry: 19 },
      torsoTop: "M100,46 Q106,73 106,97",
      torsoBottom: "M106,97 Q107,122 105,145",
      arms: ["M99,54 L68,12", "M103,54 L134,14"],
      legs: ["M105,145 L90,214", "M105,145 L120,214"],
    },
  },
  {
    id: "uttanasana",
    sanskrit: "Uttanasana",
    english: "Standing Forward Fold",
    illustration: {
      head: { cx: 90, cy: 200, rx: 17, ry: 19 },
      torsoTop: "M99,152 Q98,174 92,196",
      torsoBottom: "M100,145 L99,152",
      arms: ["M100,150 L82,202"],
      legs: ["M100,145 L84,214", "M100,145 L116,214"],
    },
  },
  {
    id: "ardha-uttanasana",
    sanskrit: "Ardha Uttanasana",
    english: "Halfway Lift",
    illustration: {
      head: { cx: 158, cy: 100, rx: 17, ry: 19 },
      torsoTop: "M122,130 L152,108",
      torsoBottom: "M100,145 L122,130",
      arms: ["M148,112 L122,144"],
      legs: ["M100,145 L84,214", "M100,145 L116,214"],
    },
  },
  {
    id: "phalakasana",
    sanskrit: "Phalakasana",
    english: "Plank Pose",
    illustration: {
      head: { cx: 44, cy: 145, rx: 18, ry: 16 },
      torsoTop: "M60,150 L110,151",
      torsoBottom: "M110,151 L165,152",
      arms: ["M62,150 L62,196"],
      legs: ["M163,152 L188,192"],
    },
  },
  {
    id: "bhujangasana",
    sanskrit: "Bhujangasana",
    english: "Cobra Pose",
    illustration: {
      head: { cx: 76, cy: 127, rx: 18, ry: 19 },
      torsoTop: "M84,150 Q106,120 123,139",
      torsoBottom: "M123,139 Q138,155 150,182",
      arms: ["M68,196 L84,150"],
      legs: ["M150,182 L188,192"],
    },
  },
  {
    id: "adho-mukha-svanasana",
    sanskrit: "Adho Mukha Svanasana",
    english: "Downward-Facing Dog",
    illustration: {
      head: { cx: 60, cy: 186, rx: 17, ry: 18 },
      torsoTop: "M86,148 L107,127",
      torsoBottom: "M107,127 L128,106",
      arms: ["M50,200 L86,148"],
      legs: ["M128,106 L168,198"],
    },
  },
  {
    id: "uttanasana-return",
    sanskrit: "Uttanasana",
    english: "Forward Fold",
    illustration: {
      head: { cx: 90, cy: 200, rx: 17, ry: 19 },
      torsoTop: "M99,152 Q98,174 92,196",
      torsoBottom: "M100,145 L99,152",
      arms: ["M100,150 L82,202"],
      legs: ["M100,145 L84,214", "M100,145 L116,214"],
    },
  },
];
