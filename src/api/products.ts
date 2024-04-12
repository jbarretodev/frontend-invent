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

  static async getProduct(id: number) {
    return await axiosInstance.get<Product>(`products/by-id/${id}`);
  }

  static async updatePriceProduct(id: number, price: number) {
    return await axiosInstance.patch<Product>(`products/${id}/update-price`, {
      price,
    });
  }

  static async updateNameProduct(id: number, name: string) {
    return await axiosInstance.patch<Product>(`products/${id}/update-name`, {
      name,
    });
  }

  static async updateSellByProduct(id: number, mode: string) {
    return await axiosInstance.patch<Product>(`products/${id}/update-mode`, {
      mode,
    });
  }

  static async updateExempt(id: number, exempt: boolean) {
    return await axiosInstance.patch<Product>(`products/${id}/update-exempt`, {
      exempt: exempt,
    });
  }
}
