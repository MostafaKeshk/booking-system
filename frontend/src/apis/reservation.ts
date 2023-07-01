import axios from "axios";
import { url } from "./utils/url";
import authHeader from "./utils/authHeader";

class ReservationApi {
  static async get(
    searchValue: string,
    pageNumber: number,
    pageSize: number,
    params: { userId?: string; restaurantId?: string; status?: string[] }
  ) {
    const queryParams = new URLSearchParams({
      pageSize: String(pageSize),
      pageNumber: String(pageNumber),
    });

    if (searchValue) {
      queryParams.append("searchValue", searchValue);
    }

    if (params.userId) {
      queryParams.append("userId", params.userId);
    }

    if (params.restaurantId) {
      queryParams.append("restaurantId", params.restaurantId);
    }

    if (params.status && params.status.length > 0) {
      params.status.forEach((status: string) => {
        queryParams.append("status", status);
      });
    }

    const result = await axios.get(`${url}/reservations?${queryParams}`, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async create(body: any) {
    const result = await axios.post(`${url}/reservations`, body, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async changeStatus(reservationId: any, body: any) {
    const result = await axios.patch(
      `${url}/reservations/${reservationId}/status`,
      body,
      {
        headers: authHeader(),
      }
    );

    return result.data;
  }
}

export default ReservationApi;
