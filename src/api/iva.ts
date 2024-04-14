import { IvaResponse } from "../@types";
import axiosInstance from "../utils.ts/axios";
export default class IvaRequest {
  static async getCurrentValueIva() {
    try {
      const rsIva = await axiosInstance.get<IvaResponse>("iva");
      return rsIva.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
