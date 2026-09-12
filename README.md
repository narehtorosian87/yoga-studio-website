# Ekam Yoga Studio — Website (v2)

The marketing website for a fictional yoga studio, built as a course exercise. This version rebuilds the original static-HTML v1 as a proper React application with a token-based design system, a small reusable component library, and a test-first workflow (unit/flow tests with Vitest + Testing Library, cross-browser responsive tests with Playwright).

Later, this is meant to grow into a two-sided app (student + instructor), but this project covers the studio-facing website only.

This project lives in its own repository (split out of a shared course-exercises monorepo) specifically so it can have its own GitHub Pages URL, independent of any other project.

## Live site

Deployed automatically to GitHub Pages on every push to `main`: **https://\<your-username\>.github.io/\<this-repo-name\>/**

## Deployment

`.github/workflows/deploy.yml` runs the test suite and typecheck, builds the app with `--base=/<repo-name>/` (so asset URLs resolve under the GitHub Pages project subpath), and publishes `dist/` via the official `actions/deploy-pages` action. Nothing needs to be built or committed by hand — just push to `main`.

**One-time setup after creating/forking this repo:** in GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**. After that, every push deploys automatically.

Two details make a React Router SPA work correctly on GitHub Pages, since it's a static host with no server-side rewrites:

- **`src/main.tsx`** derives the router's `basename` from `import.meta.env.BASE_URL` at runtime, so it automatically matches whatever `--base` the site was built with — no repo name hardcoded in application code.
- **`public/404.html`** implements the standard [SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages): a deep link or page refresh on any route other than `/` hits this 404 page, which encodes the intended path into a query string and redirects to the app root; a small script in `index.html` decodes it back via `history.replaceState` before React Router reads the URL. This keeps clean URLs (e.g. `/schedule`, not `/#/schedule`) while still surviving a hard refresh.

## Stack

- **React 18 + TypeScript + Vite** — app shell and build tooling.
- **React Router** — client-side routing between the pages.
- **Tailwind CSS** — utility classes driven by a small custom theme (see Design system below), instead of hand-rolled CSS per component.
- **Vitest + React Testing Library** — component and user-flow tests.
- **Playwright** — real-browser responsive/E2E tests across mobile, tablet, and desktop.

## Getting started

```
cd projects/yoga-studio-website
npm install
npm run dev          # start the dev server
npm run test         # run the unit/flow test suite (Vitest)
npm run test:e2e     # run the responsive/E2E suite (Playwright); builds+serves the app itself
npm run build         # type-check and produce a production build in dist/
```

## Architecture

```
yoga-studio-website/
  src/
    data/                 Single source of truth for content
      types.ts             Shared TypeScript types (ClassSession, PricingPlan, StudioEvent, ...)
      schedule.ts           Weekly class schedule
      pricing.ts             Group + private session pricing
      yogaStyles.ts            Styles of yoga copy
      events.ts                 Upcoming retreats/workshops
      studio.ts                  Instructors + mantras

    components/
      ui/                   Presentational component library (Button, Card-style
                             components, PriceCard, ScheduleTable, StyleCard, EventCard,
                             MantraBand, FormField primitives, MeditationSilhouette, ...)
      layout/                Header (nav + mobile menu), Footer, Layout (page shell,
                               also scrolls to a URL's #hash on route change)
      forms/                   GroupClassSignupForm, PrivateSessionForm

    pages/                  One component per route, composed from ui/ + data/
    config.ts                 Env-derived config (the Google Sheet endpoint URL)
    App.tsx                    Route definitions
    main.tsx                    Entry point

  e2e/                    Playwright specs (responsive + form flows)
  *.test.tsx              Vitest + Testing Library specs, colocated with the
                           component/page they test
  docs/google-apps-script.gs  Script to paste into Google Sheets — see below
```

**Why this shape:** content (schedule, pricing, styles, events) lives in `src/data/`, not scattered across JSX. The schedule table and the group-class sign-up dropdown are both generated from `schedule.ts`, so they can never drift out of sync the way two hand-written HTML lists could. Adding a class, changing a price, or adding an event just means editing one data file — no page markup to touch. Event detail pages are one route (`/events/:slug`) rendered from that same data, not a hand-written page per event.

## Pages

- **Home** (`/`) — hero, three ways into the practice, upcoming events, mantra, about.
- **Classes** (`/classes`) — the weekly group class schedule, a sign-up form, and (further down the same page, `#private-sessions`) a private session application form. These used to be two separate pages; they're one page now since a private session is just another way to book time at the studio, not a different part of the site.
- **Pricing** (`/pricing`) — group and private pricing. Its private-session button links to `/classes#private-sessions`.
- **Styles of Yoga** (`/styles-of-yoga`) — a simple comparison of the styles taught here.
- **Event detail** (`/events/:slug`) — one event's date, price, agenda, and what's included, for every entry in `src/data/events.ts`.

## Design system

Colors, type, spacing, and shadows are defined once in `tailwind.config.js` and consumed everywhere as utility classes, so a rebrand is a config edit, not a find-and-replace across pages:

- **`primary`** (sage green, 50–900): the studio's main color, used for links, buttons, active nav state, and the mantra band.
- **`secondary`** (warm clay, 50–900): accent color used sparingly (pricing "featured" tags).
- **`sand`** (warm cream → ink, 50–900): replaces gray/black/white everywhere — backgrounds, borders, body text.
- **`font-heading`** (Fraunces, serif) / **`font-body`** (Jost, sans) — the two type families used across the site.
- Shared spacing/shape tokens: `shadow-soft`, `rounded-xl2`, `max-w-content`.

The component library in `src/components/ui/` is the second half of the system: `Button`, `PriceCard`, `ScheduleTable`, `StyleCard`, `MantraBand`, and the `FormField` primitives (`TextField`/`SelectField`/`TextareaField`) are the only places that touch raw Tailwind classes for their concern. Pages compose these instead of writing their own markup, so a visual tweak to, say, every price card happens in one file.

## Recording group class registrations to a Google Sheet

The "Reserve my spot" form on `/classes` can write each registration (name, email, which class, notes) as a row in a Google Sheet — no backend required, since Google Sheets can host the receiving endpoint itself via Apps Script.

**One-time setup:**

1. Open the Google Sheet that should collect registrations.
2. **Extensions → Apps Script**, and paste in the contents of [`docs/google-apps-script.gs`](./docs/google-apps-script.gs).
3. **Deploy → New deployment → Web app**, with **Execute as: Me** and **Who has access: Anyone**, then authorize it.
4. Copy the resulting web app URL (it ends in `/exec`).
5. Set it as the `VITE_GROUP_REGISTRATION_ENDPOINT` **repository secret** (Settings → Secrets and variables → Actions) so the deploy workflow bakes it into the build. Locally, put it in a `.env` file instead (see `.env.example`).

Once that's set, every deploy after your next push will record registrations automatically. Left unset, the form behaves exactly as before: it validates, confirms locally, and resets, without recording anything.

The private session application form is intentionally **not** wired to anything yet — it's still a local-only demo, same as the rest of the site.

## Testing strategy (test-first)

Every non-trivial component and every user-facing flow was written test-first: a failing test was committed to describing the desired behavior, then the component was implemented to make it pass.

- **Unit tests** (`src/components/**/*.test.tsx`): `Button` (variants, routing, submit-safety), `PriceCard`, `ScheduleTable`, `Header` (every nav link present, active-link state, mobile menu open/close/auto-close).
- **Form flow tests** (`src/components/forms/*.test.tsx`): both forms are tested for the full flow — required-field validation blocks submission, a valid submission shows the confirmation message, and the form clears afterward. The group class dropdown is asserted to offer exactly the sessions in `schedule.ts`, and its Google Sheet integration is tested both ways: no network call when no endpoint is configured, and the right payload posted when one is (via mocking `src/config.ts`).
- **Cross-page flow tests** (`src/App.test.tsx`): full user journeys through real routing — home → classes → reserve a class, home → private sessions (same page, different section) → apply, styles-of-yoga → classes, an event tile → its detail page, an unknown event slug → home, and using the nav bar from an arbitrary page.
- **Responsive/E2E tests** (`e2e/*.spec.ts`, Playwright, real Chromium): every page is loaded at mobile (375px), tablet (768px), and desktop (1440px) widths and asserted to have **no horizontal overflow**; the mobile menu is verified to hide/show links correctly; both forms are exercised end-to-end at mobile and desktop widths; the home page hero image is confirmed to render at every breakpoint.

Run `npm run test` for the fast unit/flow suite during development, and `npm run test:e2e` before shipping a layout or CSS change, since that's the one that actually catches responsive breakage in a real browser.

## What's real vs. placeholder in this version

- **Pricing** is placeholder, flagged as a draft directly on the pricing page.
- **Schedule** (classes, days/times, instructor names) is invented for this draft.
- **Events** (`src/data/events.ts`) are invented for this draft; their detail pages are real, data-driven pages, just with fictional dates/content.
- **Group class registrations** record to a real Google Sheet once the one-time Apps Script setup above is done and the endpoint secret is set; until then (and always, locally, unless you add a `.env`) the form just validates, confirms, and resets without sending anything.
- The **private session application** form is front-end only and intentionally not wired to anything yet: it validates, shows a success message, and resets, but nothing is sent anywhere. Wiring it to a real destination is a next step.

## Natural next steps

- Wire the private session form up to a real destination too (its own Sheet tab, email, or a booking system).
- Replace placeholder pricing, schedule, events, and instructor bios with real studio details.
- Add a contact/location page once the studio has a physical address.
- Add visual regression tests (e.g. Playwright screenshots) once the design stabilizes.
- Start on the instructor-facing app.
