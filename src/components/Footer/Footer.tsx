import { getCurrentYear } from "@/utils";
import { Link, Typography } from "@mui/material";

interface IFooterProps {
  copyrightLabel: string;
}

export default function Footer({ copyrightLabel }: IFooterProps) {
  return (
    <footer>
      <Typography sx={{ textAlign: "center", mt: 1.5 }}>
        © {getCurrentYear()}.
        <Link href="https://bogdan-bogdanovic.com/" sx={{ ml: 1 }}>
          {copyrightLabel}
        </Link>
      </Typography>
    </footer>
  );
}
