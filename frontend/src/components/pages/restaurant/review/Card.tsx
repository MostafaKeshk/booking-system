import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { viewDate } from "../../../../utils/viewDate";
import { Box, Rating } from "@mui/material";
import UserProfile from "../../../general/UserProfile";
type IProps = {
  review: any;
};

const ReviewCard: React.FC<IProps> = ({ review }) => {
  return (
    <Card sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <UserProfile image={review?.user?.image} name={review?.user?.name} />
        <Typography variant="subtitle2" color="text.secondary">
          {viewDate(review.createdAt)}
        </Typography>
      </Box>

      <Rating sx={{ my: 1 }} value={review.stars} readOnly />
      <Typography>{review.comment}</Typography>
    </Card>
  );
};

export default ReviewCard;
