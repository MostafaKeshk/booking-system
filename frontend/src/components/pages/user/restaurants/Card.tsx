import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating } from "@mui/material";

type IProps = {
  restaurant: any;
  handleRestaurant: any;
};

const RestaurantCard: React.FC<IProps> = ({ restaurant, handleRestaurant }) => {
  return (
    <Card>
      <CardActionArea
        sx={{ display: "flex" }}
        onClick={() => handleRestaurant(restaurant._id)}
      >
        <CardMedia
          component="img"
          sx={{ width: 150, height: 150, objectFit: "cover" }}
          image={restaurant.image}
          alt={restaurant.name}
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" color="primary" variant="h6">
            {restaurant.name}
          </Typography>
          {restaurant.numOfReviews === 0 ? (
            <Typography variant="subtitle1" component="div">
              No reviews yet
            </Typography>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating readOnly defaultValue={restaurant.rating} />
              <Typography variant="subtitle1" component="div">
                ({restaurant.numOfReviews} users)
              </Typography>
            </Box>
          )}

          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {restaurant.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;
