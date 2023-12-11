import { vi } from "vitest";
import { getCurrentYear } from "./date";

describe("getCurrentYear()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should return the current year", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);

    const result = getCurrentYear();

    expect(result).toBe(2022);
  });
});
