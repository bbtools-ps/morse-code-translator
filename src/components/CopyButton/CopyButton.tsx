import { useDebounce } from "@/hooks";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material";
import { useState } from "react";

const TIMEOUT = 2000;

interface IProps {
  onClick: () => Promise<void>;
}

export default function CopyButton({ onClick }: IProps) {
  const [copyRequest, setCopyRequest] = useState({
    isCopied: false,
    hasError: false,
  });

  const debounce = useDebounce(TIMEOUT);

  const handleCopy = async () => {
    setCopyRequest({ isCopied: true, hasError: false });

    try {
      await onClick();
    } catch {
      setCopyRequest({ isCopied: false, hasError: true });
    } finally {
      debounce(() => {
        setCopyRequest((prevState) => ({ ...prevState, isCopied: false }));
      });
    }
  };

  return (
    <Button onClick={handleCopy} disabled={copyRequest.isCopied}>
      {copyRequest.isCopied ? (
        "Copied!"
      ) : (
        <>
          <ContentCopy sx={{ marginRight: 1 }} />
          <span>Copy to clipboard</span>
        </>
      )}
      {copyRequest.hasError && "Error"}
    </Button>
  );
}
