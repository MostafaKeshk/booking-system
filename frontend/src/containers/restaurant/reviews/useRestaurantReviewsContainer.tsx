import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import useDebounce from "../../../hooks/useDebounce";
import ReviewApi from "../../../apis/review";

const useRestaurantReviewsContainer = (restaurantId: any) => {
  const { callApi } = useCallApi();
  const [searchLoading, setSearchLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any[]>([]);

  const [count, setCount] = useState<number>(0);
  const [rowsPerPage] = useState(6);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(0);
  };

  const search = (search: string, rowsPerPage: number, pageNumber: number) => {
    setSearchLoading(true);
    const params: any = { restaurantId };

    callApi(
      ReviewApi.get(search, pageNumber + 1, rowsPerPage, params),
      (result: { rows: any[]; count: number }) => {
        setReviews(result.rows);
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
  }, [debouncedValue]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    search(searchValue, rowsPerPage, value - 1);
  };

  return {
    reviews,
    searchLoading,
    handleSearch,
    handleChangePage,
    searchValue,
    page,
    rowsPerPage,
    count,
  };
};

export default useRestaurantReviewsContainer;
