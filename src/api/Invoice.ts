import {
  Consolidate,
  DetailInvoiceInter,
  Invoice,
  InvoiceFilePDF,
  InvoicesNotPaid,
  ListInvoices,
  RsInvoiceNotPaid,
} from "../@types";
import axiosInstance from "../utils.ts/axios";
import axios, { AxiosResponse } from "axios";

export default class InvoiceRequest {
  static async saveNewPurshase(invoice: Invoice) {
    try {
      if (invoice.invoice.payment_method === "NINGUNO")
        delete invoice.invoice.payment_method;
      
      return await axiosInstance.post("/invoices", invoice);
    } catch (error) {
      return undefined;
    }
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

  static async generateInvoicePdf(id: number) {
    try {
      const rsRequest = await axiosInstance.get<InvoiceFilePDF>(
        `/invoices/generare-invoice/${id}`
      );
      return rsRequest.data.file;
    } catch (error) {
      return undefined;
    }
  }

  static async getInvoice(fileName: string) {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/pdf",
    };

    const endpoint = `${
      import.meta.env.VITE_BASE_URL_API
    }invoices/get-invoice?file=${fileName}`;

    try {
      const response: AxiosResponse = await axios.get(endpoint, {
        responseType: "blob",
        headers: headers,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      return true;
    } catch (error) {
      console.error("Error al descargar el archivo PDF:", error);
    }
  }

  static async getInvoiceNotPaid() {
    const invoices = await axiosInstance.get<RsInvoiceNotPaid[]>(
      "/invoices/not-paid"
    );

    if (invoices.data.length === 0) {
      return { total: 0, invoices: [] } as InvoicesNotPaid;
    }

    let totalNotPaid: number = 0;

    invoices.data.forEach((invoice) => {
      totalNotPaid += Number(invoice.totalInvoice);
    });

    return { invoices: invoices.data, total: totalNotPaid } as InvoicesNotPaid;
  }
}
