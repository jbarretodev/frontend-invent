import { ListProducts, Product, ProductCreate } from "../@types";
import axiosInstance from "../utils.ts/axios";
import { AxiosResponse } from "axios";

export default class ProductRequest {
  static async createProduct(
    product: ProductCreate
  ): Promise<AxiosResponse<Product>> {
    return await axiosInstance.post<Product>("products", product);
  }

  static async getProducts() {
    return await axiosInstance.get<ListProducts>("products");
  }

  static async searcherProducts(search: string) {
    return await axiosInstance.get<ListProducts>(
      `products/searcher?searcher=${search}`
    );
  }
}
