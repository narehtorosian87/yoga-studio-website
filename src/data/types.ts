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

export interface Instructor {
  id: string;
  name: string;
}

export interface Mantra {
  sanskrit: string;
  translation: string;
}

export interface AgendaItem {
  time: string;
  activity: string;
}

export interface StudioEvent {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-14". */
  date: string;
  /** Human-readable date range or single-day label shown on cards and the detail page. */
  dateLabel: string;
  location: string;
  priceFrom: string;
  /** One or two sentences shown on the home page tile. */
  summary: string;
  /** Longer description shown at the top of the detail page. */
  description: string;
  agenda: AgendaItem[];
  includes: string[];
  instructor: string;
}
