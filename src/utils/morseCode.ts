import { MorseCodeAlphabet } from "../constants";

export const decodeMorse = (morseCode: string) => {
  return morseCode
    .split("   ")
    .map((word) =>
      word
        .split(" ")
        .map((letter) =>
          Object.keys(MorseCodeAlphabet).find(
            (key) =>
              MorseCodeAlphabet[key as keyof typeof MorseCodeAlphabet] ===
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
            MorseCodeAlphabet[letter as keyof typeof MorseCodeAlphabet]
        )
        .join(" ")
    )
    .join("   ")
    .trim();
};
