import useCallApi from "../../../hooks/useCallApi";
import { useEffect, useState } from "react";
import RestaurantApi from "../../../apis/restaurant";
import { useAuth } from "../../../contexts/AuthContext";
import { viewDate } from "../../../utils/viewDate";
import { useAlert } from "../../../contexts/AlertContext";
import ReservationApi from "../../../apis/reservation";
import paths from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import ReviewApi from "../../../apis/review";

const useUserRestaurantContainer = (restaurantId: any) => {
  const { callApi, loading } = useCallApi();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setSuccessMessage } = useAlert();
  const [restaurant, setRestaurant] = useState<any>({
    name: "",
    image: "",
    numOfReviews: 0,
    rating: 0,
    bookingList: [],
    address: "",
  });
  const [reviews, setReviews] = useState<any>([]);
  const [count, setCount] = useState(0);

  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  useEffect(() => {
    setRestaurantLoading(true);
    setReviewsLoading(true);
    callApi(
      RestaurantApi.getOne(restaurantId),
      (result: any) => {
        setRestaurant(result);
        setRestaurantLoading(false);
      },
      () => {
        setRestaurantLoading(false);
      }
    );

    callApi(
      ReviewApi.get("", page, 6, { restaurantId }),
      (result: any) => {
        setCount(result.count);
        setReviews(result.rows);
        setPage(2);
        setReviewsLoading(false);
      },
      () => {
        setReviewsLoading(false);
      }
    );
  }, []);

  const fetchReviews = () => {
    callApi(ReviewApi.get("", page, 6, { restaurantId }), (result: any) => {
      setReviews((prevItems: any) => [...prevItems, ...result.rows]);
      setPage((prevPage) => prevPage + 1);
    });
  };

  const handleBook = (setLoading: any) => {
    setLoading(true);
    callApi(
      ReservationApi.create({ date, restaurantId, userId: user._id }),
      (result: any) => {
        setRestaurant({
          ...restaurant,
          bookingList: [...restaurant.bookingList, { userId: user._id, date }],
        });
        setLoading(false);
        setShowDialog(false);
        setDate(new Date());
        setSuccessMessage(
          `you have successfully booked a table at ${viewDate(date)}`
        );
        navigate(paths.getUserReservations(user._id));
      },
      () => {
        setLoading(false);
      }
    );
  };

  const pageLoading = reviewsLoading || restaurantLoading;

  return {
    loading,
    pageLoading,
    restaurant,
    reviews,
    fetchReviews,
    count,
    handleBook,

    showDialog,
    setShowDialog,

    date,
    setDate,
  };
};

export default useUserRestaurantContainer;
