import { HistoryOperation,DataListOperationRow } from "./../@types/index.d";
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

export const getFieldTableProduct = (
  products: Product[]
): DataProductRow[] | [] => {
  return products.map((product) => {
    return {
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
