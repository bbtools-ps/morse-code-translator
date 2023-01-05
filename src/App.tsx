import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import Logo from "./common/components/Logo";
import { decodeMorse, encodeMorse } from "./common/functions/utils";

export default function App() {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [translateToggle, setTranslateToggle] = useState<boolean>(false);
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const outputRef = useRef<HTMLElement>();
  const isDesktop = useMediaQuery("(min-width:600px)");

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
    <Grid
      direction="column"
      rowSpacing={3}
      rowGap={3}
      container
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        sx={{
          marginTop: "2rem",
          gap: "2rem",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">
          <strong>Morse code</strong>
        </Typography>
        <Typography variant="h4">translator</Typography>
        <Logo
          size={50}
          style={!isDesktop ? { marginTop: "-1.5rem" } : undefined}
        />
      </Grid>
      <Typography variant="body1">
        Letters are separated by a single space " " and words by 3 spaces " ".
      </Typography>
      <Grid
        direction={isDesktop ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
        rowGap={1}
        container
        columnGap={1}
      >
        <TextField
          label={`${!translateToggle ? "Original text" : "Morse code"}`}
          multiline
          minRows={5}
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
        <Button
          onClick={(e) => {
            setValue(translatedValue);
            setTranslatedValue(value);
            setTranslateToggle((prevState) => !prevState);
          }}
        >
          <SyncAltIcon />
        </Button>
        <Box sx={{ flex: 1, width: !isDesktop ? "100%" : undefined }}>
          <Card variant="outlined" style={{ padding: "1rem" }}>
            <Grid direction="column" container>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {`${!translateToggle ? "Morse code" : "Translated text"}`}
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: translatedValue }}
                style={{
                  minHeight: "3rem",
                  backgroundColor: grey[50],
                  padding: ".5rem",
                }}
                marginBottom={3}
                ref={outputRef}
              />
              <Grid item alignSelf="center">
                <Button
                  onClick={() => {
                    setCopyToClipboard(true);
                    navigator.clipboard.writeText(outputRef.current.innerText);
                  }}
                >
                  {!copyToClipboard && (
                    <ContentCopyIcon sx={{ marginRight: 1 }} />
                  )}
                  {!copyToClipboard ? "Copy to clipboard" : "Copied!"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
