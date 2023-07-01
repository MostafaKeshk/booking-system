import { Typography, Box } from "@mui/material";

type IProps = {
  text: string;
  Icon: any;
};

const IconText: React.FC<IProps> = ({ text, Icon }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ mr: 1 }} color="primary" />

      <Typography gutterBottom variant="body1" component="div">
        {text}
      </Typography>
    </Box>
  );
};

export default IconText;
