import axiosInstance from "../utils.ts/axios";

export default class ClientRequest {
  static async getOneClient(identification: string) {
    try {
      if (identification.trim() === "") {
        return -1;
      }

      const rsRequest = await axiosInstance.get(`/clients/${identification}`);
      return rsRequest.data;
    } catch (error) {
      return undefined;
    }
  }
}
