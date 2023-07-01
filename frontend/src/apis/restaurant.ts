import axios from "axios";
import { url } from "./utils/url";
import authHeader from "./utils/authHeader";

class RestaurantApi {
  static async get(searchValue: string, pageNumber: number, pageSize: number) {
    const result = await axios.get(
      `${url}/restaurants?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: authHeader(),
      }
    );

    return result.data;
  }

  static async getOne(restaurantId: any) {
    const result = await axios.get(`${url}/restaurants/${restaurantId}`, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async update(restaurantId: any, body: any) {
    const result = await axios.patch(
      `${url}/restaurants/${restaurantId}`,
      body,
      {
        headers: authHeader(),
      }
    );

    return result.data;
  }

  static async create(body: any) {
    const result = await axios.post(`${url}/restaurants`, body, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async delete(ids: any) {
    const result: any = await axios.delete(`${url}/restaurants`, {
      headers: authHeader(),
      data: { ids },
    });

    return result.data;
  }
}

export default RestaurantApi;
