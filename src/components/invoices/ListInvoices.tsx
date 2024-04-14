import { Card } from "flowbite-react";
import DataTable, { TableColumn } from "react-data-table-component";
import { PurchaseRow } from "../../@types";
import { useEffect, useState } from "react";
import InvoiceRequest from "../../api/Invoice";
import { getFieldsTableListPurchase } from "../../utils.ts";
import CustomCell from "../shared/CustomCell.tsx";

interface ListInvoicesProps {
  dateSearch: string;
}

const ListInvoices = ({ dateSearch }: ListInvoicesProps) => {
  const [purchase, setPurchases] = useState<PurchaseRow[]>([]);

  const column: TableColumn<PurchaseRow>[] = [
    {
      name: "Responsable",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Método de Pago",
      selector: (row) => row.method,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Número de Operación",
      selector: (row) => row.num_operation,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Detalles",
      selector: (row) => row.id,
      cell: (row) => (
        <CustomCell
          message="Ver Detalles!"
          route="/dashboard/invoice"
          id={row.id}
        />
      ),
    },
  ];

  useEffect(() => {
    InvoiceRequest.getInvoices(dateSearch)
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data.invoices)) {
          setPurchases(getFieldsTableListPurchase(res.data));
        }
      })
      .catch((err) => console.log(err));
  }, [dateSearch]);

  return (
    <>
      <Card className="gap-3">
        <DataTable
          title="Listas de Ventas"
          pagination
          columns={column}
          data={purchase}
        />
      </Card>
    </>
  );
};

export default ListInvoices;
