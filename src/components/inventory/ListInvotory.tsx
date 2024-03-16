import { useEffect, useState } from "react";
import { DataListOperationRow } from "../../@types";
import OperationInventory from "../../api/OperationEnventory";
import DataTable, { TableColumn } from "react-data-table-component";
import { getFieldsTableListOperations } from "../../utils.ts";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";

const ListInvotory = () => {
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
      name: "Tipo de Operacion",
      selector: (row) => row.type_operation,
      sortable: true,
      cell: (row) =>
        row.type_operation === 1 ? (
          <HiArrowNarrowRight />
        ) : (
          <HiArrowNarrowLeft />
        ),
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => row.date.split('T')[0]
    },
  ];

  useEffect(() => {
    OperationInventory.listOperationHistory()
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
  }, []);

  return (
    <>
      <h3 className="text-3xl font-bold mb-4 text-center mt-10">
        Listado de Actividad del Inventario
      </h3>
      <DataTable
        title={"Historial de Inventario"}
        columns={columns}
        data={listOperation || []}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
      />
    </>
  );
};

export default ListInvotory;
