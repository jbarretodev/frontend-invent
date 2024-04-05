import axiosInstance from "../utils.ts/axios";
import { ClientInvoices } from "../@types";

export default class ClientRequest {
  static async getOneClient(identification: string) {
    try {
      if (identification.trim() === "") {
        return -1;
      }

      const rsRequest = await axiosInstance.get(`/clients/${identification}`);
      return rsRequest.data;
    } catch (error) {
      return undefined;
    }
  }

  static async getAllClient() {
    try {
      const rsRequest = await axiosInstance.get("/clients/all/no-invoice");

      return rsRequest.data;
    } catch (error) {
      return undefined;
    }
  }

  static async getClientInvoice(id: number) {
    try {
      const rsRequest = await axiosInstance.get<ClientInvoices>(
        `/clients/${id}/invoices`
      );
      return rsRequest.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}
