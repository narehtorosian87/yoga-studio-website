import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GroupClassSignupForm } from "./GroupClassSignupForm";
import { classSchedule, formatSessionLabel } from "../../data/schedule";

function fillRequiredFields(nameValue = "Jordan Reyes", emailValue = "jordan@example.com") {
  return async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText("Full name"), nameValue);
    await user.type(screen.getByLabelText("Email"), emailValue);
    await user.selectOptions(screen.getByLabelText("Choose a class"), classSchedule[0].id);
  };
}

describe("GroupClassSignupForm", () => {
  it("offers every scheduled class session as a dropdown option", () => {
    render(<GroupClassSignupForm />);
    const select = screen.getByLabelText("Choose a class") as HTMLSelectElement;
    // +1 for the placeholder "select a class" option.
    expect(select.options).toHaveLength(classSchedule.length + 1);
    expect(screen.getByRole("option", { name: formatSessionLabel(classSchedule[0]) })).toBeInTheDocument();
  });

  it("does not confirm a reservation when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<GroupClassSignupForm />);
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("confirms the reservation once name, email, and a class are filled in", async () => {
    const user = userEvent.setup();
    render(<GroupClassSignupForm />);
    await fillRequiredFields()(user);
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));
    expect(screen.getByRole("status")).toHaveTextContent(/spot is reserved/i);
  });

  it("clears the form after a successful reservation", async () => {
    const user = userEvent.setup();
    render(<GroupClassSignupForm />);
    await fillRequiredFields()(user);
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));

    expect(screen.getByLabelText("Full name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
  });

  it("does not submit an invalid email address", async () => {
    const user = userEvent.setup();
    render(<GroupClassSignupForm />);
    await user.type(screen.getByLabelText("Full name"), "Jordan Reyes");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.selectOptions(screen.getByLabelText("Choose a class"), classSchedule[0].id);
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not attempt to record anything when no sheet endpoint is configured", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response());
    const user = userEvent.setup();
    render(<GroupClassSignupForm />);
    await fillRequiredFields()(user);
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

describe("GroupClassSignupForm, with a sheet endpoint configured", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock("../../config", () => ({ GROUP_REGISTRATION_ENDPOINT: "https://script.google.com/macros/s/fake/exec" }));
  });

  afterEach(() => {
    vi.doUnmock("../../config");
  });

  it("posts the registration, including which class was chosen, to the configured endpoint", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response());
    const { GroupClassSignupForm: MockedForm } = await import("./GroupClassSignupForm");

    const user = userEvent.setup();
    render(<MockedForm />);
    await fillRequiredFields("Priya Shah", "priya@example.com")(user);
    await user.type(screen.getByLabelText("Anything we should know (optional)"), "First time");
    await user.click(screen.getByRole("button", { name: "Reserve my spot" }));

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://script.google.com/macros/s/fake/exec");
    expect(init).toMatchObject({ method: "POST", mode: "no-cors" });

    const body = JSON.parse(init?.body as string);
    expect(body).toMatchObject({
      name: "Priya Shah",
      email: "priya@example.com",
      className: formatSessionLabel(classSchedule[0]),
      notes: "First time",
    });

    fetchSpy.mockRestore();
  });
});
