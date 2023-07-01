import { Box, Typography, useTheme } from "@mui/material";

type IProps = {
  Icon: any;
  title: string;
  info: number;
  noBorder?: boolean;
};

const InfoCard: React.FC<IProps> = ({ Icon, title, info, noBorder }) => {
  const theme = useTheme();

  const classes = {
    container: {
      p: 3,
      borderRight: noBorder ? "none" : `1px solid ${theme.palette.divider}`,
    },
    iconContainer: { display: "flex", alignItems: "center", mb: 2 },
    title: { fontSize: "16px", fontWeight: "bold" },

    icon: { fontSize: "16px", mr: 0.5 },
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.iconContainer}>
        <Icon sx={{ mr: 1 }} />
        <Typography component="h6" variant="body1" sx={classes.title}>
          {title}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: "600" }} component="h3" variant="h4">
        {info}
      </Typography>
    </Box>
  );
};

export default InfoCard;
