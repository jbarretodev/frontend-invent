import { HistoryProductRoot, OperationCreate } from "../@types";
import axiosInstance from "../utils.ts/axios";
import { ListOperationHistory } from "../@types";

export default class OperationInventory {
  static async saveOperation(dataOp: OperationCreate) {
    dataOp.type_op = dataOp.type_op * 1;
    dataOp.product_id = dataOp.product_id * 1;
    dataOp.quantity = dataOp.quantity * 1;

    console.log(dataOp);

    return await axiosInstance.post<HistoryProductRoot>(
      "history-product",
      dataOp
    );
  }

  static async listOperationHistory() {
    return await axiosInstance.get<ListOperationHistory>("history-product");
  }
}
