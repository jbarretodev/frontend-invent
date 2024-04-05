import { InvoiceCli } from "../../@types";
import { Card } from "flowbite-react";
import DataTable, { TableColumn } from "react-data-table-component";
import CustomCell from "../shared/CustomCell";
import { getFieldsClientInvoices } from "../../utils.ts";

type ClientInvoiceProp = {
  fullName: string;
  invoices: InvoiceCli[];
};

type DataRowClientInvoice = {
  total: number;
  num_operation?: string;
  status: Boolean;
  paymentMethod: string;
  id: number;
  date: string;
};

const ClientInvoicesComponent = ({ fullName, invoices }: ClientInvoiceProp) => {
  const columns: TableColumn<DataRowClientInvoice>[] = [
    {
      name: "Numero de Operacion",
      selector: (row) => row.num_operation || '',
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Pagada" : "Pendiente"),
      sortable: true,
    },
    {
      name: "Metodo de pago",
      selector: (row) => row.paymentMethod,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Detalles",
      selector: (row) => row.id,
      cell: (row) => (
        <CustomCell type={1} id={row.id} message="Detalles" route={`/dashboard/invoice/${row.id}`} />
      ),
    },
  ];

  const dataTable = getFieldsClientInvoices(invoices);

  return (
    <>
      <Card>
        <DataTable
          title={`Listado de compras de ${fullName}`}
          columns={columns}
          data={dataTable}
        />
      </Card>
    </>
  );
};

export default ClientInvoicesComponent;
