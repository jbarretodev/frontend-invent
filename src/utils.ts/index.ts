import {
  HistoryOperation,
  DataListOperationRow,
  ListInvoices,
  PurchaseRow,
  ListClient,
  ListClientTable,
  Client,
  InvoiceCli,
  InvoicesNotPaidInter,
  RsInvoiceNotPaid,
  InvoicesNotPaidTable,
} from "./../@types/index.d";
import dayjs from "dayjs";
import { DataProductRow, ListOperationHistory, Product } from "../@types";

export const checkLoginUser = () => {
  const user = localStorage.getItem("user");
  const expireAt = localStorage.getItem("expireAt");
  const token = localStorage.getItem("token");

  if (!user || !expireAt || !token) return false;

  if (!dayjs().isBefore(expireAt)) return false;

  return true;
};

export const logOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

export const getFieldTableProduct = (
  products: Product[]
): DataProductRow[] | [] => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      code: product.code,
      quantity: product.quantity,
      price: product.price,
      createdAt: product.createdAt,
    };
  });
};

export const getFieldsTableListOperations = (
  listOperations: ListOperationHistory
): DataListOperationRow[] => {
  return listOperations.historyOperations.map((operation: HistoryOperation) => {
    return {
      product: operation.product.name,
      quantity: operation.quantity,
      responsible: operation.user.fullName,
      type_operation: operation.typeOp,
      date: operation.createdAt,
    };
  });
};

export const getFieldsTableListPurchase = (
  listPurchases: ListInvoices
): PurchaseRow[] => {
  return listPurchases.invoices.map((purchase) => {
    return {
      id: purchase.id,
      user: purchase.user.fullName,
      method: purchase.paymentMethod,
      status: purchase.status ? "Pagada" : "No pagada",
      date: purchase.createdAt.split("T")[0],
      num_operation: purchase.numOperation ?? "",
      total: Number(purchase.totalInvoice),
    };
  });
};

export const getFieldsTableClient = (
  listClient: ListClient
): ListClientTable => {
  return listClient.map((client: Client) => {
    return {
      fullName: client.fullName,
      phone: client.phone ?? "",
      identification: client.identification,
      createdAt: client.createdAt,
      id: client.id,
    };
  });
};

export const getFieldsClientInvoices = (invoices: InvoiceCli[]) => {
  return invoices.map((invoice) => {
    return {
      id: invoice.id,
      status: invoice.status,
      total: Number(invoice.totalInvoice),
      num_operation: invoice.numOperation,
      date: invoice.date,
      paymentMethod: invoice.paymentMethod,
    };
  });
};

export const getFieldsInvoiceNotPaidTable = (
  dataTableNotPaid: InvoicesNotPaidInter
): InvoicesNotPaidTable[] => {
  return dataTableNotPaid.invoices.map((invoice: RsInvoiceNotPaid) => {
    return {
      id: invoice.id,
      client: invoice.client?.fullName || "",
      date: dayjs(invoice.date).format("YYYY-MM-DD"),
      total: Number(invoice.totalInvoice),
      responsible: invoice.user.fullName,
    };
  });
};
