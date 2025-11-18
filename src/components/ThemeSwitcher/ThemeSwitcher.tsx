import { useColorMode } from "@/hooks/useColorTheme";
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
      sx={{ ml: 1 }}
      onClick={toggleColorMode}
      color="inherit"
      aria-label="Theme switch"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
