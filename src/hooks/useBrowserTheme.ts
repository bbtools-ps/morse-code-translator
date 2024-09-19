import { useEffect, useState } from "react";

export const useBrowserTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleThemeChange = (e: any) => {
      setIsDarkTheme(e.matches);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);

    return () => window.removeEventListener("change", handleThemeChange);
  }, []);

  return isDarkTheme;
};
