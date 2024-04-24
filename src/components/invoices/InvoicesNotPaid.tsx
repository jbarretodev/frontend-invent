import { useEffect, useState } from "react";
import { InvoicesNotPaidInter, InvoicesNotPaidTable } from "../../@types";
import InvoiceRequest from "../../api/Invoice";
import { Card } from "flowbite-react";
import { getFieldsInvoiceNotPaidTable } from "../../utils.ts";
import DataTable, { TableColumn } from "react-data-table-component";
import CustomCell from "../shared/CustomCell.tsx";

const InvoicesNotPaid = () => {
  const [__invoicesNotPaid, setInvoicesNotPaid] =
    useState<InvoicesNotPaidInter>({
      total: 0,
      invoices: [],
    });

  const [tableInvoiceNotPaid, setTableInvoiceNotPaid] =
    useState<InvoicesNotPaidTable[]>();

  const columns: TableColumn<InvoicesNotPaidTable>[] = [
    {
      name: "Responsable",
      selector: (row) => row.responsible,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.client,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Ver Detalle",
      selector: (row) => row.id,
      cell: (row) => (
        <CustomCell message="Detalles" route="/dashboard/invoice" id={row.id} />
      ),
    },
  ];

  useEffect(() => {
    InvoiceRequest.getInvoiceNotPaid().then((rs) => {
      setInvoicesNotPaid(rs);

      if (rs.invoices.length === 0) setTableInvoiceNotPaid([]);

      const dataTableNotPaid = getFieldsInvoiceNotPaidTable(rs);
      setTableInvoiceNotPaid(dataTableNotPaid);
    });
  }, []);

  return (
    <>
      <Card>
        <DataTable
          columns={columns}
          data={tableInvoiceNotPaid ?? []}
          pagination
          title="Listado de ventas no pagadas"
        />
        <p>
          Cantidad Total por pagar:{" "}
          <span className="text-2xl font-bold">{__invoicesNotPaid.total}</span>
        </p>
      </Card>
    </>
  );
};

export default InvoicesNotPaid;
