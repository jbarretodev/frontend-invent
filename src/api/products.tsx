import { Product, ProductCreate } from "../@types";
import axiosInstance from "../utils.ts/axios";

export default class ProductRequest {
  static async createProduct(product: ProductCreate) {
    return await axiosInstance.post<Product>("products",product);
    //console.log(rs);
  }
}
