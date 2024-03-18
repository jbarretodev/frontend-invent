import { Invoice } from "../@types";
import axiosInstance from "../utils.ts/axios";

export default class InvoiceRequest{
  static async saveNewPurshase(invoice: Invoice) {
    return await axiosInstance.post("/invoices",invoice)
  }
}