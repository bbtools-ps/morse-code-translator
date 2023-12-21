import ContentCopy from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface ICopyButtonProps {
  messageDelay?: number;
  onClick: () => void;
}

const CopyButton: React.FC<ICopyButtonProps> = ({
  messageDelay = 2000,
  onClick,
}) => {
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copyToClipboard) {
        setCopyToClipboard(false);
      }
    }, messageDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [copyToClipboard, messageDelay]);

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
};

export default CopyButton;
