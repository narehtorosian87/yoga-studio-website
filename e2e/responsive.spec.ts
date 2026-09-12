import { test, expect, type Page } from "@playwright/test";

const PAGES = [
  { path: "/", heading: "Find your ground." },
  { path: "/classes", heading: "This week at the studio" },
  { path: "/pricing", heading: "Simple pricing, no fine print" },
  { path: "/styles-of-yoga", heading: "Which class is actually for you" },
  { path: "/events/autumn-weekend-retreat", heading: "Autumn Weekend Retreat" },
];

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

for (const breakpoint of BREAKPOINTS) {
  test.describe(`at ${breakpoint.name} width (${breakpoint.width}px)`, () => {
    test.use({ viewport: { width: breakpoint.width, height: breakpoint.height } });

    for (const pageInfo of PAGES) {
      test(`${pageInfo.path} renders with no horizontal overflow`, async ({ page }) => {
        await page.goto(pageInfo.path);
        await expect(page.getByRole("heading", { level: 1, name: pageInfo.heading })).toBeVisible();
        expect(await hasHorizontalOverflow(page)).toBe(false);
      });
    }
  });
}

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("nav links are collapsed behind a menu button until opened", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: /open menu/i });
    await expect(menuButton).toBeVisible();

    const mobileNav = page.getByTestId("mobile-nav");
    await expect(mobileNav.getByRole("link", { name: "Pricing" })).toBeHidden();

    await menuButton.click();
    await expect(mobileNav.getByRole("link", { name: "Pricing" })).toBeVisible();

    await mobileNav.getByRole("link", { name: "Pricing" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Simple pricing, no fine print" })).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "Pricing" })).toBeHidden();
  });
});

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("nav links are visible directly, with no menu button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(page.getByRole("button", { name: /open menu/i })).toBeHidden();
  });
});

test.describe("home page hero image", () => {
  for (const breakpoint of BREAKPOINTS) {
    test(`renders the meditation silhouette at ${breakpoint.name} width`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto("/");
      await expect(page.getByRole("img", { name: /meditation pose/i })).toBeVisible();
    });
  }
});

test.describe("upcoming events", () => {
  test("a tile on the home page links to its own event detail page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Autumn Weekend Retreat" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Autumn Weekend Retreat" })).toBeVisible();
    await expect(page.getByText("What's included")).toBeVisible();
  });
});
