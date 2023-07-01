import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { viewDate } from "../../../../utils/viewDate";
import { Box, Button, Chip, Rating } from "@mui/material";
type IProps = {
  reservation: any;
  handleOpenReview: any;
};

const ReservationHistoryCard: React.FC<IProps> = ({
  reservation,
  handleOpenReview,
}) => {
  return (
    <Card>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 150, height: 150, objectFit: "cover" }}
          image={reservation?.restaurant?.image}
          alt={reservation?.restaurant?.name}
        />
        <CardContent sx={{ flex: "1 0 auto", pb: `0!important` }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component="div" color="primary" variant="h6">
              {reservation?.restaurant?.name}
            </Typography>
          </Box>

          <Typography variant="subtitle2" component="div">
            {viewDate(reservation.date)}
          </Typography>
          <Chip label={reservation.status} sx={{ my: 1 }} />
          {reservation.status === "done" && !reservation?.review?.stars && (
            <Button
              sx={{ display: "block", mb: 1 }}
              size="small"
              onClick={() => handleOpenReview(reservation)}
              variant="contained"
            >
              Write a review
            </Button>
          )}
        </CardContent>
      </Box>
      {reservation?.review?.stars && (
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h6"
            component="h6"
            color="primary"
            sx={{ fontWeight: "700", fontSize: "18px" }}
          >
            Your review
          </Typography>
          <Rating readOnly value={reservation.review.stars} />
          <Typography variant="subtitle2" component="div">
            {reservation.review.comment}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ReservationHistoryCard;
