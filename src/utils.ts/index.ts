import dayjs from "dayjs";
import { DataProductRow, Product } from "../@types";

export const checkLoginUser = () => {
  const user = localStorage.getItem("user");
  const expireAt = localStorage.getItem("expireAt");
  const token = localStorage.getItem("token");

  if (!user || !expireAt || !token) return false;

  if (!dayjs().isBefore(expireAt)) return false;

  return true;
};

export const getFieldTableProduct = ( products: Product[] ): DataProductRow[] | [] =>
{
  return products.map((product) => {
    return {
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      createdAt: product.createdAt,
    };
  });
}