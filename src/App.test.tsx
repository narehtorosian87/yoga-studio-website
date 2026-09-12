import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { classSchedule } from "./data/schedule";
import { studioEvents } from "./data/events";

function renderApp(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the home page at /", () => {
    renderApp("/");
    expect(screen.getByRole("heading", { level: 1, name: "Find your ground." })).toBeInTheDocument();
  });

  it("renders the classes page at /classes", () => {
    renderApp("/classes");
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();
  });

  it("renders the pricing page at /pricing", () => {
    renderApp("/pricing");
    expect(screen.getByRole("heading", { level: 1, name: "Simple pricing, no fine print" })).toBeInTheDocument();
  });

  it("renders the styles of yoga page at /styles-of-yoga", () => {
    renderApp("/styles-of-yoga");
    expect(screen.getByRole("heading", { level: 1, name: "Which class is actually for you" })).toBeInTheDocument();
  });

  it("includes a Private Sessions section on the classes page", () => {
    renderApp("/classes");
    expect(screen.getByRole("heading", { level: 2, name: "Private Sessions" })).toBeInTheDocument();
  });

  it("renders an event detail page at /events/:slug", () => {
    const event = studioEvents[0];
    renderApp(`/events/${event.slug}`);
    expect(screen.getByRole("heading", { level: 1, name: event.title })).toBeInTheDocument();
  });

  it("sends an unknown event slug back to the home page", () => {
    renderApp("/events/does-not-exist");
    expect(screen.getByRole("heading", { level: 1, name: "Find your ground." })).toBeInTheDocument();
  });
});

describe("Cross-page user flows", () => {
  it("lets a visitor go from the home page CTA to reserving a group class", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: "View the schedule" }));
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();

    const groupForm = screen.getByRole("button", { name: "Reserve my spot" }).closest("form") as HTMLElement;
    await user.type(within(groupForm).getByLabelText("Full name"), "Jordan Reyes");
    await user.type(within(groupForm).getByLabelText("Email"), "jordan@example.com");
    await user.selectOptions(within(groupForm).getByLabelText("Choose a class"), classSchedule[0].id);
    await user.click(within(groupForm).getByRole("button", { name: "Reserve my spot" }));

    expect(screen.getByRole("status")).toHaveTextContent(/spot is reserved/i);
  });

  it("lets a visitor go from the home page CTA to applying for a private session", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: /apply for a private session/i }));
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Private Sessions" })).toBeInTheDocument();

    const privateForm = screen.getByRole("button", { name: "Send application" }).closest("form") as HTMLElement;
    await user.type(within(privateForm).getByLabelText("Full name"), "Jordan Reyes");
    await user.type(within(privateForm).getByLabelText("Email"), "jordan@example.com");
    await user.selectOptions(within(privateForm).getByLabelText("Experience level"), "Some experience");
    await user.type(within(privateForm).getByLabelText("What are you hoping to work on?"), "More flexibility");
    await user.click(within(privateForm).getByRole("button", { name: "Send application" }));

    expect(screen.getByRole("status")).toHaveTextContent(/received your application/i);
  });

  it("lets a visitor browse styles of yoga then jump to the schedule", async () => {
    const user = userEvent.setup();
    renderApp("/");

    await user.click(screen.getByRole("link", { name: /compare the styles/i }));
    expect(screen.getByRole("heading", { level: 1, name: "Which class is actually for you" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "View the schedule" }));
    expect(screen.getByRole("heading", { level: 1, name: "This week at the studio" })).toBeInTheDocument();
  });

  it("lets a visitor use the nav bar to reach pricing from anywhere on the site", async () => {
    const user = userEvent.setup();
    renderApp("/styles-of-yoga");

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    await user.click(within(primaryNav).getByRole("link", { name: "Pricing" }));
    expect(screen.getByRole("heading", { level: 1, name: "Simple pricing, no fine print" })).toBeInTheDocument();
  });
});
