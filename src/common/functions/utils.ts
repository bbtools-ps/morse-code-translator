import { morseCodeAlphabet } from "../constants/constants";

export const decodeMorse = (morseCode: string) => {
  return morseCode
    .split("   ")
    .map((word) =>
      word
        .split(" ")
        .map((letter) =>
          Object.keys(morseCodeAlphabet).find(
            (key) =>
              morseCodeAlphabet[key as keyof typeof morseCodeAlphabet] ===
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
    .replace(/\s/g, " ")
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map(
          (letter) =>
            morseCodeAlphabet[letter as keyof typeof morseCodeAlphabet]
        )
        .join(" ")
    )
    .join("   ")
    .trim();
};
