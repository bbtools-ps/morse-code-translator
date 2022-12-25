import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./common/components/Logo";
import { decodeMorse, encodeMorse } from "./common/functions/utils";

export default function App() {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [translateToggle, setTranslateToggle] = useState<boolean>(false);
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copyToClipboard) {
        setCopyToClipboard(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [copyToClipboard]);

  return (
    <div className="app">
      <Grid direction="column" rowSpacing={3} container>
        <Grid item>
          <Typography variant="h3">Morse code translate</Typography>
          <Logo size={50} />
        </Grid>
        <Grid item>
          <Typography variant="caption">
            Letters are separated by a single space " " and words by 3 spaces "
            ".
          </Typography>
        </Grid>
        <Grid
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowGap={1}
          container
        >
          <TextField
            label={`${!translateToggle ? "Original text" : "Morse code"}`}
            multiline
            minRows={5}
            value={value}
            fullWidth
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              setTranslatedValue(
                !translateToggle
                  ? encodeMorse(e.target.value)
                  : decodeMorse(e.target.value)
              );
            }}
          />
          <Button
            onClick={(e) => {
              setValue(translatedValue);
              setTranslatedValue(value);
              setTranslateToggle((prevState) => !prevState);
            }}
          >
            <SyncAltIcon />
          </Button>
          <TextField
            label={`${!translateToggle ? "Morse code" : "Translated text"}`}
            multiline
            minRows={5}
            value={translatedValue}
            fullWidth
            variant="filled"
            disabled
          />
          <Button
            onClick={() => {
              setCopyToClipboard(true);
              navigator.clipboard.writeText(translatedValue);
            }}
          >
            {!copyToClipboard ? "Copy to clipboard" : "Copied!"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
