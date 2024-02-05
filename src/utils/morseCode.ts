import { MORSE_CODE_ALPHABET } from "../constants";

export const decodeMorse = (morseCode: string) => {
  return morseCode
    .split("   ")
    .map((word) =>
      word
        .split(" ")
        .map((letter) =>
          Object.keys(MORSE_CODE_ALPHABET).find(
            (key) =>
              MORSE_CODE_ALPHABET[key as keyof typeof MORSE_CODE_ALPHABET] ===
              letter
          )
        )
        .join("")
    )
    .join(" ")
    .trim();
};

export const encodeMorse = (str: string) => {
  return str
    .toUpperCase()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map(
          (letter) =>
            MORSE_CODE_ALPHABET[letter as keyof typeof MORSE_CODE_ALPHABET]
        )
        .join(" ")
    )
    .join("   ")
    .trim();
};
