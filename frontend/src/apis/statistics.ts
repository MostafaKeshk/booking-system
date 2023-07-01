import axios from "axios";
import { url } from "./utils/url";
import authHeader from "./utils/authHeader";

class StatisticsApi {
  static async get(restaurantId: string) {
    const result = await axios.get(
      `${url}/restaurants/${restaurantId}/statistics`,
      {
        headers: authHeader(),
      }
    );

    return result.data;
  }
}

export default StatisticsApi;
