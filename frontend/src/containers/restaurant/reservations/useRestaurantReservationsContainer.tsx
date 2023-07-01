import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import useDebounce from "../../../hooks/useDebounce";
import ReservationApi from "../../../apis/reservation";
import { useAlert } from "../../../contexts/AlertContext";

const useRestaurantReservationsContainer = (restaurantId: any) => {
  const { callApi } = useCallApi();
  const { setSuccessMessage } = useAlert();
  const [searchLoading, setSearchLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<any[]>([]);

  const [count, setCount] = useState<number>(0);
  const [rowsPerPage] = useState(6);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [status, setStatus] = useState<string>("all");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(0);
  };

  const search = (search: string, rowsPerPage: number, pageNumber: number) => {
    setSearchLoading(true);
    const params: any = { restaurantId };
    if (status !== "all") {
      params.status = [status];
    }
    callApi(
      ReservationApi.get(search, pageNumber + 1, rowsPerPage, params),
      (result: { rows: any[]; count: number }) => {
        setReservations(result.rows);
        setCount(result.count);
        setSearchLoading(false);
      },
      () => {
        setSearchLoading(false);
      }
    );
  };

  useEffect(() => {
    search(searchValue, rowsPerPage, 0);
  }, [debouncedValue, status]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    search(searchValue, rowsPerPage, value - 1);
  };

  const handleStatus = (
    id: string,
    value: string,
    setSelectedStatus: any,
    setLoading: any
  ) => {
    setLoading(true);
    callApi(
      ReservationApi.changeStatus(id, { status: value }),
      () => {
        setSelectedStatus(value);
        setLoading(false);
        setSuccessMessage("Reservation status has been changed successfully.");
      },
      () => {
        setLoading(false);
      }
    );
  };

  const handleFilter = (e: any) => {
    const value = e.target.value;
    setStatus(value);
  };

  const tableHeads = [
    { label: "Customer name", align: "left" },
    { label: "Phone Number", align: "left" },
    { label: "Email", align: "left" },
    { label: "Created Date", align: "left" },
    { label: "Book Date", align: "left" },
    { label: "Status", align: "center" },
  ];

  return {
    reservations,
    searchLoading,
    handleSearch,
    handleChangePage,
    searchValue,
    page,
    rowsPerPage,
    count,
    handleStatus,
    tableHeads,

    handleFilter,
    status,
  };
};

export default useRestaurantReservationsContainer;
