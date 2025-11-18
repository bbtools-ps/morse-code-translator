import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

type ColorMode = "light" | "dark";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorTheme = () => {
  const [mode, setMode] = useState<ColorMode>(() => {
    const savedTheme = localStorage.getItem("theme") as ColorMode;
    if (savedTheme) return savedTheme;
    // Fall back to browser preference if no saved theme
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("theme", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return { colorMode, theme };
};
