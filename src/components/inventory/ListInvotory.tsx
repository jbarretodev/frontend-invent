import { useEffect, useState } from "react";
import { DataListOperationRow } from "../../@types";
import OperationInventory from "../../api/OperationEnventory";
import DataTable, { TableColumn } from "react-data-table-component";
import { getFieldsTableListOperations } from "../../utils.ts";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Card } from "flowbite-react";
import dayjs from "dayjs";
interface DateListOperationProp {
  date: string;
}

const ListInvotory = ({ date }: DateListOperationProp) => {
  const [listOperation, setListOperation] = useState<DataListOperationRow[]>(
    []
  );

  const columns: TableColumn<DataListOperationRow>[] = [
    {
      name: "Producto",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Responsable",
      selector: (row) => row.responsible,
      sortable: true,
    },
    {
      name: "Tipo de Operación",
      selector: (row) => row.type_operation,
      sortable: true,
      cell: (row) =>
        row.type_operation === 1 ? (
          <FaArrowAltCircleRight className="text-green-500 text-2xl" />
        ) : (
          <FaArrowAltCircleLeft className="text-red-600 text-2xl" />
        ),
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => row.date.split("T")[0],
    },
  ];

  useEffect(() => {
    OperationInventory.listOperationHistory(dayjs(date).format("YYYY-MM-DD"))
      .then((rs) => {
        if (
          rs.data.historyOperations.length > 0 &&
          Array.isArray(rs.data.historyOperations)
        ) {
          const fieldsDataTable = getFieldsTableListOperations(rs.data);
          setListOperation(fieldsDataTable);
        }
      })
      .catch((err) => console.log(err));
  }, [date]);

  return (
    <>
      <Card className="mt-10">
        <DataTable
          title={"Historial de Inventario"}
          columns={columns}
          data={listOperation || []}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </Card>
    </>
  );
};

export default ListInvotory;
