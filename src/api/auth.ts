import axios from "axios";
import { ResourceNotFound, ResponseLoginUser, ResourceError } from "../@types";

export default class AuthService {
  static async login(email: string, password: string) {
    try {
      const rsLogin = await axios.post<ResponseLoginUser>(
        `${import.meta.env.VITE_BASE_URL_API}auth/sign-in`,
        { email, password }
      );

      if (rsLogin.status === 200) {
        return rsLogin.data as ResponseLoginUser;
      }

      return {
        error: true,
        status: 401,
        message: "Credenciales invalidos!",
      } as ResourceNotFound;
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        message: e,
      } as ResourceError;
    }
  }
}
