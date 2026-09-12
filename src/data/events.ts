import type { StudioEvent } from "./types";

/**
 * Upcoming studio events (retreats, workshops). Single source of truth
 * for both the home page tiles and the /events/:slug detail pages.
 */
export const studioEvents: StudioEvent[] = [
  {
    slug: "autumn-weekend-retreat",
    title: "Autumn Weekend Retreat",
    date: "2026-11-14",
    dateLabel: "November 14 – 16, 2026",
    location: "Ekam Yoga Studio & Riverbend Cabins",
    priceFrom: "$420",
    summary: "A quiet weekend away: two nights, four practices, and a lot of unstructured time to rest.",
    description:
      "Three days at Riverbend Cabins, a short drive from the studio, built around a simple rhythm: morning practice, long breaks, an evening practice, and early nights. No phones-away rule, no forced sharing circles, just space to slow down alongside people who practice at Ekam.",
    agenda: [
      { time: "Friday, 5:00 PM", activity: "Arrival, tea, and a gentle opening practice" },
      { time: "Saturday, 7:30 AM", activity: "Morning Vinyasa Flow" },
      { time: "Saturday, 4:00 PM", activity: "Restorative Yoga by the river" },
      { time: "Sunday, 8:00 AM", activity: "Closing Hatha practice" },
      { time: "Sunday, 11:00 AM", activity: "Shared lunch and departure" },
    ],
    includes: [
      "2 nights shared cabin accommodation",
      "4 guided practices",
      "All meals from Friday dinner through Sunday lunch",
      "A private single-room upgrade, if available",
    ],
    instructor: "Maya Torres",
  },
  {
    slug: "new-year-intention-workshop",
    title: "New Year Intention Workshop",
    date: "2027-01-10",
    dateLabel: "January 10, 2027",
    location: "Ekam Yoga Studio",
    priceFrom: "$65",
    summary: "A single afternoon to set the year up on purpose: movement, journaling, and a plan you'll actually keep.",
    description:
      "A three-hour afternoon workshop at the studio combining a full-length practice with guided journaling. You'll leave with something concrete: a short, honest practice plan for the months ahead, not just a vague resolution.",
    agenda: [
      { time: "1:00 PM", activity: "Grounding Hatha practice" },
      { time: "2:15 PM", activity: "Tea break" },
      { time: "2:30 PM", activity: "Guided journaling and intention-setting" },
      { time: "3:30 PM", activity: "Closing circle and gentle stretch" },
    ],
    includes: [
      "3-hour guided workshop",
      "A printed journaling workbook to keep",
      "Tea and a light snack",
    ],
    instructor: "Priya Nandakumar",
  },
];
