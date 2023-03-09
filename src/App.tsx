import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CopyButton from "./common/components/CopyButton/CopyButton";
import Footer from "./common/components/Footer/Footer";
import Logo from "./common/components/Logo/Logo";
import { decodeMorse, encodeMorse } from "./common/functions/utils";

export default function App() {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [translateToggle, setTranslateToggle] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width:600px)");

  const handleReset = () => {
    setValue("");
    setTranslatedValue("");
    setTranslateToggle(false);
  };

  return (
    <Box
      sx={{ display: "flex", flex: 1, flexDirection: "column", p: 3, gap: 3 }}
    >
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
          <Typography variant="h4">
            <strong>Morse code</strong>
          </Typography>
          <Typography variant="h4">translator</Typography>
        </Box>
        <Logo size={50} />
      </Grid>
      <Typography variant="body1" textAlign="center">
        Letters are separated by a single space " " and words by 3 spaces " ".
      </Typography>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", gap: 3 }}>
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
            label={`${!translateToggle ? "Original text" : "Morse code"}`}
            multiline
            minRows={6}
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              setTranslatedValue(
                !translateToggle
                  ? encodeMorse(e.target.value)
                  : decodeMorse(e.target.value)
              );
            }}
            fullWidth={!isDesktop}
            sx={isDesktop ? { flex: 1 } : undefined}
          />
          <IconButton
            onClick={() => {
              setValue(translatedValue);
              setTranslatedValue(value);
              setTranslateToggle((prevState) => !prevState);
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
                >
                  {`${!translateToggle ? "Morse code" : "Translated text"}`}
                </Typography>
                {/* OUTPUT FIELD */}
                <Typography
                  variant="body1"
                  sx={{
                    minHeight: "3rem",
                    backgroundColor: grey[50],
                    padding: ".5rem",
                    fontWeight: translateToggle === false ? "bold" : "inherit",
                    fontSize: translateToggle === false ? "1.5rem" : "inherit",
                    whiteSpace: "pre",
                  }}
                  marginBottom={3}
                  aria-label={`${
                    !translateToggle ? "Morse code" : "Translated text"
                  }`}
                >
                  {translatedValue}
                </Typography>
                <Grid item alignSelf="center">
                  <CopyButton
                    onClick={() => {
                      if (!translatedValue) return;
                      navigator.clipboard.writeText(translatedValue);
                    }}
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
  );
}
