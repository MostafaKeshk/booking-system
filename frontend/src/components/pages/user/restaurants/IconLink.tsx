import { useTheme, Typography, Box } from "@mui/material";

type IProps = {
  text: string;
  href: string;
  Icon: any;
};

const IconLink: React.FC<IProps> = ({ text, href, Icon }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ mr: 1 }} color="primary" />

      <Typography
        gutterBottom
        variant="body1"
        component="a"
        href={href}
        sx={{
          color: `text.primary`,
          display: "block",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default IconLink;
