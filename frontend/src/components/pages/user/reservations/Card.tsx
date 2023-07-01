import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { viewDate } from "../../../../utils/viewDate";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { reservationStatus } from "../../../../utils/constants";
type IProps = {
  reservation: any;
  handleOpenCancel: any;
};

const ReservationCard: React.FC<IProps> = ({
  reservation,
  handleOpenCancel,
}) => {
  const color =
    reservation.status === reservationStatus.pending ? "warning" : "info";

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, objectFit: "cover" }}
        image={reservation?.restaurant?.image}
        alt={reservation?.restaurant?.name}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
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
          {reservation.status === reservationStatus.pending && (
            <Tooltip title="Cancel reservation">
              <IconButton onClick={() => handleOpenCancel(reservation)}>
                <CancelIcon color="error" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Typography variant="subtitle2" component="div">
          {viewDate(reservation.date)}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          component="div"
          gutterBottom
        >
          {reservation?.restaurant?.address}
        </Typography>
        <Chip label={reservation.status} color={color} />
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
