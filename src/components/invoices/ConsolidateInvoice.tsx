import { useEffect, useState } from "react";
import InvoiceRequest from "../../api/Invoice";
import dayjs from "dayjs";
import { Consolidate } from "../../@types";
import { Card } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

interface ConsolidateProp {
  date: Date;
}

const ConsolidateInvoice = ({ date }: ConsolidateProp) => {
  const [consolidate, setConsolidate] = useState<Consolidate>();

  useEffect(() => {
    InvoiceRequest.getConsolidateInvoices(dayjs(date).format("YYYY/MM/DD"))
      .then((rs) => setConsolidate(rs.data))
      .catch((err) => console.log(err));
  }, [date]);
  return (
    <>
      <Card>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Cantidad de Ventas Hechas</TableHeaderCell>
                <TableHeaderCell>Ventas No Pagadas</TableHeaderCell>
                <TableHeaderCell>Ventas Pagadas</TableHeaderCell>
                <TableHeaderCell>Monto Total de Ventas</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{consolidate?.count_invoices}</TableCell>
                <TableCell>{consolidate?.invoices_not_paid}</TableCell>
                <TableCell>{consolidate?.invoices_paid}</TableCell>
                <TableCell>{consolidate?.invoices_consolidate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default ConsolidateInvoice;
