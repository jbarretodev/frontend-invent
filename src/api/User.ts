import axiosInstance from "../utils.ts/axios";
import { User, UserCreateInter, UserUpdate } from "../@types";

export default class UserRequest {
  static async getUserList(): Promise<User[] | []> {
    try {
      const response = await axiosInstance.get<User[]>("users");
      return response.data.length > 0 ? response.data : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getUser(id: number): Promise<User | null> {
    try {
      const response = await axiosInstance.get<User>(`users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async createUser(user: UserCreateInter): Promise<User | null> {
    try {
      const response = await axiosInstance.post<User>("users", user);
      return response.data || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async updateUser(user: UserUpdate): Promise<User | null> {
    try {
      const response = await axiosInstance.patch<User>(
        `users/${user.id}`,
        user
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
