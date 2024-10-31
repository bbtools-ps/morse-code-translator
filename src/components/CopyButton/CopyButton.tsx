import { useDebounce } from "@/hooks";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
  messageDelay?: number;
  onClick: () => void;
}

export default function CopyButton({ messageDelay = 2000, onClick }: IProps) {
  const [copyToClipboard, setCopyToClipboard] = useState(false);

  const debounce = useDebounce(messageDelay);

  useEffect(() => {
    debounce(() => {
      if (copyToClipboard) {
        setCopyToClipboard(false);
      }
    });
  }, [copyToClipboard, debounce]);

  return (
    <Button
      onClick={() => {
        onClick();
        setCopyToClipboard(true);
      }}
    >
      {!copyToClipboard && <ContentCopy sx={{ marginRight: 1 }} />}
      {!copyToClipboard ? "Copy to clipboard" : "Copied!"}
    </Button>
  );
}
