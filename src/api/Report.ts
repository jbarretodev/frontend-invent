import axiosInstance from "../utils.ts/axios";
import { ReportBestSelling, reportSells } from "../@types";

export default class Report {
  static async getBestSelling(
    dateInit: string,
    dateEnd: string
  ): Promise<ReportBestSelling[] | undefined> {
    try {
      const response = await axiosInstance.get<ReportBestSelling[]>(
        `report/report-best-salling?dateInit=${dateInit}&dateEnd=${dateEnd}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async getReportSells(
    dateInit: string,
    dateEnd: string
  ): Promise<reportSells[] | undefined> {
    try {
      const response = await axiosInstance.get<reportSells[]>(
        `report/report-sells?dateInit=${dateInit}&dateEnd=${dateEnd}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
