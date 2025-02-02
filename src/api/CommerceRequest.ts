import { CommerceCreate, CommerceResponse } from "../@types";
import axiosInstance from "../utils.ts/axios";

export default class CommerceRequest {
  static async getInfoCommerce() {
    try {
      const commerce = await axiosInstance.get<CommerceResponse>("/commerce");

      if (commerce.status === 200) {
        return commerce.data;
      }
    } catch (error) {
      return undefined;
    }
  }

  static async updateInfoCommerce(dataCommerce: CommerceCreate) {
    try {
      const commerce = await axiosInstance.post<CommerceResponse>(
        "/commerce",
        dataCommerce
      );

      if (commerce.status === 200) {
        return commerce.data;
      }
    } catch (error) {
      return undefined;
    }
  }

  static async getDolarRate() {
    try {
      const response = await axiosInstance.get<{ dolarRate: number }>(
        "/commerce/dolar-rate"
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
