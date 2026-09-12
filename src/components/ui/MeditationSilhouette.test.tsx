import { render, screen } from "@testing-library/react";
import { MeditationSilhouette } from "./MeditationSilhouette";

describe("MeditationSilhouette", () => {
  it("renders as a labeled image for assistive tech, with no visible text content", () => {
    render(<MeditationSilhouette />);
    const figure = screen.getByRole("img", { name: /meditation pose/i });
    expect(figure).toBeInTheDocument();
    expect(figure.textContent).toBe("");
  });
});
