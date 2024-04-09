import { InvoiceCli } from "../../@types";
import { Card } from "flowbite-react";
import DataTable, { TableColumn } from "react-data-table-component";
import CustomCell from "../shared/CustomCell";
import { getFieldsClientInvoices } from "../../utils.ts";
import InvoiceRequest from "../../api/Invoice.ts";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const generateeinvoice = async (id: number) => {
    setIsLoading(true);
    const rsRequest = await InvoiceRequest.generateInvoicePdf(id);

    if (!rsRequest) {
      toast.error("Error al generar la factura", { duration: 5000 });
      return;
    }

    await InvoiceRequest.getInvoice(rsRequest);
    setIsLoading(false);
  };

  const columns: TableColumn<DataRowClientInvoice>[] = [
    {
      name: "Numero de Operacion",
      selector: (row) => row.num_operation || "",
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
        <CustomCell
          type={1}
          id={row.id}
          message="Detalles"
          route={`/dashboard/invoice/${row.id}`}
        />
      ),
    },
    {
      name: "Factura",
      selector: (row) => row.id,
      cell: (row) => (
        <CustomCell
          type={1}
          id={row.id}
          message="Imprimir"
          handlerClick={async () => await generateeinvoice(Number(row.id))}
        />
      ),
    },
  ];

  const dataTable = getFieldsClientInvoices(invoices);

  return (
    <>
      <Card>
        <div className="text-center">
          {isLoading && (
            <Spinner size="xl" aria-label="Center-aligned spinner example" />
          )}
        </div>
        <DataTable
          title={`Listado de compras de ${fullName}`}
          columns={columns}
          data={ dataTable }
          pagination
        />
      </Card>
    </>
  );
};

export default ClientInvoicesComponent;
