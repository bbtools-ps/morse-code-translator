import { useDebounce } from "@/hooks";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import { useState } from "react";

interface IProps {
  messageDelay?: number;
  onClick: () => Promise<void>;
}

export default function CopyButton({ messageDelay = 2000, onClick }: IProps) {
  const [isCopied, setIsCopied] = useState(false);

  const debounce = useDebounce(messageDelay);

  const handleCopy = async () => {
    setIsCopied(true);

    console.log(isCopied);

    try {
      await onClick();
    } catch (error) {
      console.error(error);
    } finally {
      debounce(() => {
        setIsCopied(false);
      });
    }
  };

  return (
    <Button onClick={handleCopy}>
      {!isCopied && <ContentCopy sx={{ marginRight: 1 }} />}
      {!isCopied ? "Copy to clipboard" : "Copied!"}
    </Button>
  );
}
