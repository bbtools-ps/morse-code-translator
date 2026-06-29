import { useColorMode } from "@/hooks";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";

export default function ThemeSwitcher() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      type="button"
      role="switch"
      aria-checked={theme.palette.mode === "dark"}
      aria-label="Dark theme"
      sx={{ ml: 1 }}
      onClick={toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
