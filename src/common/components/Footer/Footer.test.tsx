import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Copyright from "./Footer";

describe("<Footer/>", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should render the current year and the label value (string)", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);
    const testLabel = "test";
    render(<Copyright copyrightLabel={testLabel} />);

    expect(screen.getByText(testLabel)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });
});
