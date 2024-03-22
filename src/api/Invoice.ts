import {
  Consolidate,
  DetailInvoiceInter,
  Invoice,
  ListInvoices,
} from "../@types";
import axiosInstance from "../utils.ts/axios";

export default class InvoiceRequest {
  static async saveNewPurshase(invoice: Invoice) {
    return await axiosInstance.post("/invoices", invoice);
  }

  static async getInvoices(dateSearch: string) {
    return await axiosInstance.get<ListInvoices>(
      `/invoices?dateSearch=${encodeURIComponent(dateSearch)}`
    );
  }

  static async getInvoiceDetailById(id: number) {
    return await axiosInstance.get<DetailInvoiceInter>(
      `/invoices/details/${id}`
    );
  }

  static async getConsolidateInvoices(date: string) {
    return await axiosInstance.get<Consolidate>(
      `/invoices/consolidate?date=${encodeURIComponent(date)}`
    );
  }
}
