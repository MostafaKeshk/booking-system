import useCallApi from "../../../hooks/useCallApi";
import { useEffect, useState } from "react";
import ReservationApi from "../../../apis/reservation";
import { useAuth } from "../../../contexts/AuthContext";
import { useAlert } from "../../../contexts/AlertContext";
import useDebounce from "../../../hooks/useDebounce";
import { reservationStatus } from "../../../utils/constants";

const useUserReservationsContainer = () => {
  const { callApi, loading } = useCallApi();
  const { user } = useAuth();
  const { setSuccessMessage } = useAlert();
  const [reservations, setReservations] = useState<any>([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [selectedReservation, setSelectedReservation] = useState({
    _id: "",
    restaurantId: "",
    restaurant: {
      name: "",
    },
  });
  const [count, setCount] = useState<any>(0);

  const [page, setPage] = useState(1);

  const debounceValue = useDebounce(searchValue, 500);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const fetchData = () => {
    callApi(
      ReservationApi.get(searchValue, page, 6, {
        userId: user._id,
        status: [reservationStatus.pending, reservationStatus.accepted],
      }),
      (result: any) => {
        setReservations((prevItems: any) => [...prevItems, ...result.rows]);
        setPage((prevPage) => prevPage + 1);
        setSearchLoading(false);
      }
    );
  };

  useEffect(() => {
    setSearchLoading(true);
    callApi(
      ReservationApi.get(searchValue, 1, 6, {
        userId: user._id,
        status: [reservationStatus.pending, reservationStatus.accepted],
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

  const handleOpenCancel = (reservation: any) => {
    setSelectedReservation(reservation);
    setShowCancelModal(true);
  };

  const handleCancel = () => {
    callApi(
      ReservationApi.changeStatus(selectedReservation._id, {
        status: reservationStatus.cancelled,
      }),
      (result: any) => {
        setShowCancelModal(false);
        setSuccessMessage("Reservation has been cancelled successfully.");
        setReservations((prev: any) =>
          [...prev].filter(
            (reservation: any) => reservation._id !== selectedReservation._id
          )
        );
        setCount((prev: any) => prev - 1);
      }
    );
  };

  return {
    loading,
    reservations,
    page,
    searchLoading,
    count,
    fetchData,
    handleOpenCancel,
    showCancelModal,
    setShowCancelModal,
    selectedReservation,
    handleCancel,
    handleSearch,
    searchValue,
  };
};

export default useUserReservationsContainer;
