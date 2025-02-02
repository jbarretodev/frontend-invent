import axiosInstance from "../utils.ts/axios";
import { Roles } from "../@types";
export default class RoleRequest {
  static async getRoles(): Promise<Roles | []> {
    try {
      const response = await axiosInstance.get<Roles>("roles");
      return response.data.length > 0 ? response.data : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
