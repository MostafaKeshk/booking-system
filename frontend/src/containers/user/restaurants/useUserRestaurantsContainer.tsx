import useCallApi from "../../../hooks/useCallApi";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import RestaurantApi from "../../../apis/restaurant";
import paths from "../../../routes/paths";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useUserRestaurantsContainer = () => {
  const { callApi, loading } = useCallApi();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [restaurants, setRestaurants] = useState<any>([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [count, setCount] = useState<any>(0);

  const [page, setPage] = useState(1);

  const debounceValue = useDebounce(searchValue, 500);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const fetchData = () => {
    callApi(RestaurantApi.get(debounceValue, page, 6), (result: any) => {
      setRestaurants((prevItems: any) => [...prevItems, ...result.rows]);
      setPage((prevPage) => prevPage + 1);
      setSearchLoading(false);
    });
  };

  useEffect(() => {
    setSearchLoading(true);
    callApi(
      RestaurantApi.get(debounceValue, 1, 6),
      (result: any) => {
        setCount(result.count);
        setRestaurants(result.rows);
        setPage(2);
        setSearchLoading(false);
      },
      () => {
        setSearchLoading(false);
        setRestaurants([]);
        setCount(0);
      }
    );
  }, [debounceValue]);

  const handleRestaurant = (id: any) => {
    navigate(paths.getUserRestaurant(user._id, id));
  };

  return {
    loading,
    restaurants,
    handleSearch,
    searchValue,
    page,
    searchLoading,
    count,
    fetchData,
    handleRestaurant,
  };
};

export default useUserRestaurantsContainer;
