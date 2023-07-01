import { url } from "./utils/url";
import axios from "axios";

class AuthApi {
  static async login(body: any) {
    const result = await axios.post(`${url}/auth/login`, body);

    return result.data;
  }

  static async restaurantSignup(body: any) {
    const result = await axios.post(`${url}/auth/register/restaurant`, body);

    return result.data;
  }

  static async userSignup(body: any) {
    const result = await axios.post(`${url}/auth/register/user`, body);

    return result.data;
  }
}

export default AuthApi;
