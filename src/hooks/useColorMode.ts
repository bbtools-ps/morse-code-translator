import { createContext, useContext } from "react";

/**
 * Represents the shape of the color mode context.
 */
interface ColorModeContextType {
  toggleColorMode: () => void;
}

/**
 * Context for managing the application's color mode (theme).
 */
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

/**
 * Custom hook to access the color mode context.
 * Provides access to the toggleColorMode function.
 *
 * @returns {ColorModeContextType} The color mode context values.
 * @throws {Error} If the hook is used outside of a ThemeProvider.
 *
 * @example
 * const { toggleColorMode } = useColorMode();
 */
export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used within a ThemeProvider");
  }

  return context;
};
