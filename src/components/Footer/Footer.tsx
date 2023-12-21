import { getCurrentYear } from "@/utils";
import { Link, Typography } from "@mui/material";

interface IFooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<IFooterProps> = ({ copyrightLabel }) => {
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
};

export default Footer;
