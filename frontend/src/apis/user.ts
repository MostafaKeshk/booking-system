import axios from "axios";
import { url } from "./utils/url";
import authHeader from "./utils/authHeader";

class UserApi {
  static async get(searchValue: string, pageNumber: number, pageSize: number) {
    const result = await axios.get(
      `${url}/users?searchValue=${searchValue}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: authHeader(),
      }
    );

    return result.data;
  }

  static async getOne(userId: any) {
    const result = await axios.get(`${url}/users/${userId}`, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async update(userId: any, body: any) {
    const result = await axios.patch(`${url}/users/${userId}`, body, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async create(body: any) {
    const result = await axios.post(`${url}/users`, body, {
      headers: authHeader(),
    });

    return result.data;
  }

  static async delete(ids: any) {
    const result: any = await axios.delete(`${url}/users`, {
      headers: authHeader(),
      data: { ids },
    });

    return result.data;
  }
}

export default UserApi;
