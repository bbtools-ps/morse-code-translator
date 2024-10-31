import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CopyButton from "./components/CopyButton/CopyButton";
import Footer from "./components/Footer/Footer";
import Logo from "./components/Logo/Logo";
import MorsePlayer from "./components/MorsePlayer/MorsePlayer";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { ColorModeContext, useColorTheme } from "./hooks";
import { decodeMorse, encodeMorse } from "./utils";

export default function App() {
  const [value, setValue] = useState("");
  const [translatedValue, setTranslatedValue] = useState("");
  const [isMorseTranslated, setIsMorseTranslated] = useState(false);

  const isDesktop = useMediaQuery("(min-width:37.5em)");
  const { colorMode, theme } = useColorTheme();

  const handleReset = () => {
    setValue("");
    setTranslatedValue("");
    setIsMorseTranslated(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            p: 3,
            gap: 3,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: -2 }}>
            <ThemeSwitcher />
          </Box>
          <Grid
            container
            direction="row"
            sx={{
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h1">
                <strong>Morse code</strong>
              </Typography>
              <Typography variant="h2">translator</Typography>
            </Box>
            <Logo
              size={50}
              style={{ fill: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            />
          </Grid>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {`Letters are separated by a single space " " and words by 3 spaces "   ".`}
          </Typography>
          <Box
            sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 3 }}
          >
            <Grid
              direction={isDesktop ? "row" : "column"}
              justifyContent="center"
              alignItems="center"
              rowGap={1}
              container
              columnGap={1}
            >
              {/* INPUT FIELD */}
              <TextField
                label={`${isMorseTranslated ? "Morse code" : "Original text"}`}
                multiline
                minRows={6}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value.toUpperCase());
                  setTranslatedValue(
                    isMorseTranslated
                      ? decodeMorse(e.target.value)
                      : encodeMorse(e.target.value)
                  );
                }}
                fullWidth={!isDesktop}
                sx={isDesktop ? { flex: 1 } : undefined}
              />
              <IconButton
                onClick={() => {
                  setValue(translatedValue);
                  setTranslatedValue(value);
                  setIsMorseTranslated((prevState) => !prevState);
                }}
                aria-label="Translate switch"
              >
                <SyncAltIcon />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  height: "100%",
                  width: !isDesktop ? "100%" : undefined,
                }}
              >
                <Card variant="outlined" style={{ padding: "1rem", flex: 1 }}>
                  <Grid direction="column" container>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                      id="outputValue"
                    >
                      {`${isMorseTranslated ? "Translated text" : "Morse code"}`}
                    </Typography>
                    {/* OUTPUT FIELD */}
                    <Typography
                      variant="body1"
                      sx={{
                        minHeight: "3rem",
                        backgroundColor: grey[50],
                        padding: ".5rem",
                        fontWeight: isMorseTranslated ? "inherit" : "bold",
                        fontSize: isMorseTranslated ? "inherit" : "1.5rem",
                        whiteSpace: "pre",
                        bgcolor: "action.hover",
                      }}
                      marginBottom={3}
                    >
                      <span
                        aria-labelledby="outputValue"
                        role="textbox"
                        aria-readonly
                      >
                        {translatedValue}
                      </span>
                    </Typography>
                    <Grid item alignSelf="center">
                      <CopyButton
                        onClick={async () => {
                          if (!translatedValue) return;
                          await navigator.clipboard.writeText(translatedValue);
                        }}
                      />
                      <MorsePlayer
                        originalText={
                          isMorseTranslated ? translatedValue : value
                        }
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Box>
            </Grid>
            <Box justifyContent="center" display="flex">
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </Box>
          <Footer copyrightLabel="Bogdan Bogdanovic" />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
