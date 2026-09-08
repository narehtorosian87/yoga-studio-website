export interface ClassSession {
  id: string;
  day: string;
  /** 0 = Monday .. 5 = Saturday, used for sort order. */
  dayOrder: number;
  time: string;
  className: string;
  instructor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  tag?: string;
  featured?: boolean;
}

export interface YogaStyle {
  id: string;
  name: string;
  tag: string;
  description: string;
}

/**
 * A tapered garment segment: a trapezoid from (x1,y1) with width w1 to
 * (x2,y2) with width w2, so a torso panel can be wider at the shoulder
 * than the waist instead of a uniform-width stroke.
 */
export interface TaperedSegment {
  x1: number;
  y1: number;
  w1: number;
  x2: number;
  y2: number;
  w2: number;
}

/** A straight capsule-shaped limb from one point to another. */
export interface Limb {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
}

export interface PoseIllustrationData {
  /** An oval head silhouette — deliberately faceless, just a soft shape. */
  head: { cx: number; cy: number; rx: number; ry: number };
  /** Chest/back segment of the torso, colored as the top. */
  torsoTop: TaperedSegment;
  /** Waist/hip segment of the torso, colored the same as the legs. */
  torsoBottom: TaperedSegment;
  /** Bare-skin-colored arms. */
  arms: Limb[];
  /** Legging-colored legs. */
  legs: Limb[];
}

export interface Pose {
  id: string;
  sanskrit: string;
  english: string;
  illustration: PoseIllustrationData;
}

export interface Instructor {
  id: string;
  name: string;
}

export interface Mantra {
  sanskrit: string;
  translation: string;
}
