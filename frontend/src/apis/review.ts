import axios from "axios";
import { url } from "./utils/url";
import authHeader from "./utils/authHeader";

class ReviewApi {
  static async get(
    searchValue: string,
    pageNumber: number,
    pageSize: number,
    params: { restaurantId: string }
  ) {
    const queryParams = new URLSearchParams({
      pageSize: String(pageSize),
      pageNumber: String(pageNumber),
      restaurantId: params.restaurantId,
    });

    if (searchValue) {
      queryParams.append("searchValue", searchValue);
    }

    const result = await axios.get(`${url}/reviews?${queryParams}`, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async create(body: any) {
    const result = await axios.post(`${url}/reviews`, body, {
      headers: authHeader(),
    });

    return result.data;
  }
}

export default ReviewApi;
