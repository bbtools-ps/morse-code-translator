import { vi } from "vitest";
import { decodeMorse, encodeMorse, getCurrentYear } from "./utils";

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

describe("encodeMorse()", () => {
  it("should convert the regular text to morse code", () => {
    const testValue1 = "SOS";
    const testValue2 = "another example";

    const result1 = encodeMorse(testValue1);
    const result2 = encodeMorse(testValue2);

    expect(result1).toBe("... --- ...");
    expect(result2).toBe(".- -. --- - .... . .-.   . -..- .- -- .--. .-.. .");
  });
  it("should trim all excessive whitespaces at the start, end and in the middle of the words", () => {
    const testValue1 = "    SOS     ";
    const testValue2 = "another     example";

    const result1 = encodeMorse(testValue1);
    const result2 = encodeMorse(testValue2);

    expect(result1).toBe("... --- ...");
    expect(result2).toBe(".- -. --- - .... . .-.   . -..- .- -- .--. .-.. .");
  });

  it('should also convert the intepunction signs like ",.!?" into morse code', () => {
    const testValue = ",.!?";

    const result = encodeMorse(testValue);

    expect(result).toBe("--..-- .-.-.- -.-.-- ..--..");
  });
});

describe("decodeMorse()", () => {
  it("should convert morse code to regular text", () => {
    const testValue1 = "... --- ...";
    const testValue2 = ".- -. --- - .... . .-.   . -..- .- -- .--. .-.. .";
    const testValue3 = "--..-- .-.-.- -.-.-- ..--..";

    const result1 = decodeMorse(testValue1);
    const result2 = decodeMorse(testValue2);
    const result3 = decodeMorse(testValue3);

    expect(result1).toBe("SOS");
    expect(result2).toBe("ANOTHER EXAMPLE");
    expect(result3).toBe(",.!?");
  });
});
