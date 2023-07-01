import useCallApi from "../../../hooks/useCallApi";
import { useEffect, useState } from "react";
import ReservationApi from "../../../apis/reservation";
import { useAuth } from "../../../contexts/AuthContext";
import { useAlert } from "../../../contexts/AlertContext";
import { useFormik } from "formik";
import reviewSchema from "../../../validations/user/review";
import useDebounce from "../../../hooks/useDebounce";
import { reservationStatus } from "../../../utils/constants";
import ReviewApi from "../../../apis/review";
const useUserHistoryContainer = () => {
  const { callApi, loading } = useCallApi();
  const { user } = useAuth();
  const { setSuccessMessage } = useAlert();
  const [reservations, setReservations] = useState<any>([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [initialValues] = useState({
    stars: 0,
    comment: "",
  });
  const [selectedReservation, setSelectedReservation] = useState({
    _id: "",
    restaurant: {
      _id: "",
    },
  });
  const [count, setCount] = useState<any>(0);

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const fetchData = () => {
    callApi(
      ReservationApi.get(searchValue, page, 6, {
        userId: user._id,
        status: [reservationStatus.cancelled, reservationStatus.done],
      }),
      (result: any) => {
        setReservations((prevItems: any) => [...prevItems, ...result.rows]);
        setPage((prevPage) => prevPage + 1);
        setSearchLoading(false);
      }
    );
  };

  const debounceValue = useDebounce(searchValue, 500);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    setSearchLoading(true);
    callApi(
      ReservationApi.get(searchValue, 1, 6, {
        userId: user._id,
        status: [reservationStatus.cancelled, reservationStatus.done],
      }),
      (result: any) => {
        setCount(result.count);
        setReservations(result.rows);
        setPage(2);
        setSearchLoading(false);
      },
      () => {
        setSearchLoading(false);
        setReservations([]);
        setCount(0);
      }
    );
  }, [debounceValue]);

  const handleOpenReview = (reservation: any) => {
    setSelectedReservation(reservation);
    setShowReviewModal(true);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: reviewSchema,
    onSubmit: (values: any) => handleSubmit(values),
  });

  const handleSubmit = (values: any) => {
    const body = {
      ...values,
      userId: user._id,
      reservationId: selectedReservation._id,
      restaurantId: selectedReservation.restaurant._id,
      createdAt: new Date(),
    };
    callApi(ReviewApi.create(body), (result: any) => {
      setShowReviewModal(false);
      setSuccessMessage("Review has been submitted successfully.");
      const updatedReservations = [...reservations];
      const objIndex = updatedReservations.findIndex(
        (obj) => obj._id === selectedReservation._id
      );
      updatedReservations[objIndex].review = {
        stars: values.stars,
        comment: values.comment,
        _id: result._id,
      };
      setReservations(updatedReservations);
    });
  };

  return {
    loading,
    reservations,
    searchLoading,
    count,
    fetchData,
    handleOpenReview,
    showReviewModal,
    setShowReviewModal,
    formik,
    searchValue,
    handleSearch,
  };
};

export default useUserHistoryContainer;
