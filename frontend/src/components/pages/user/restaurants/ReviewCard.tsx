import { Box, Divider, Rating, Typography } from "@mui/material";
import UserProfile from "../../../general/UserProfile";
import { viewDate } from "../../../../utils/viewDate";

const ReviewCard = ({ res }: any) => {
  return (
    <Box>
      <UserProfile image={res.user.image} name={res.user.name} />
      <Typography variant="subtitle2" sx={{ my: 1 }}>
        {viewDate(res.createdAt)}
      </Typography>
      <Rating readOnly defaultValue={res.stars} />
      <Typography sx={{ mb: 2 }} variant="body1">
        {res.comment}
      </Typography>
      <Divider />
    </Box>
  );
};

export default ReviewCard;
