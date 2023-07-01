import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import StatisticsApi from "../../../apis/statistics";

type IData = {
  doneChartData: any[];
  canceledChartData: any[];
  starsChartData: any[];
  doneReservations: number;
  acceptedReservations: number;
  pendingReservations: number;
  canceledReservations: number;
};

const useRestaurantHomeContainer = (restaurantId: any) => {
  const { callApi } = useCallApi();
  const [dataLoading, setDataLoading] = useState(true);

  const [data, setData] = useState<IData>({
    doneChartData: [],
    canceledChartData: [],
    starsChartData: [],
    doneReservations: 0,
    acceptedReservations: 0,
    pendingReservations: 0,
    canceledReservations: 0,
  });

  useEffect(() => {
    setDataLoading(true);
    callApi(
      StatisticsApi.get(restaurantId),
      (response: any) => {
        setData(response.data);
        setDataLoading(false);
      },
      () => {
        setDataLoading(false);
      }
    );
  }, [restaurantId]);

  return {
    data,
    dataLoading,
  };
};

export default useRestaurantHomeContainer;
