import {
  HistoryOperation,
  DataListOperationRow,
  ListInvoices,
  PurchaseRow,
} from "./../@types/index.d";
import dayjs from "dayjs";
import { DataProductRow, ListOperationHistory, Product } from "../@types";
//import { Navigate } from "react-router-dom";

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
