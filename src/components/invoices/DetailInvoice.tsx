import { useEffect, useState } from "react";
import InvoiceRequest from "../../api/Invoice";
import { Card } from "flowbite-react";
import { Table } from "flowbite-react";
import { DetailInvoiceInter } from "../../@types";

interface DetailInvoiceProp {
  id: number;
}

const DetailInvoice = ({ id }: DetailInvoiceProp) => {
  const [detail, setDetail] = useState<DetailInvoiceInter>();

  useEffect(() => {
    InvoiceRequest.getInvoiceDetailById(id).then((rs) => setDetail(rs.data));
  }, [id]);

  return (
    <>
      <Card>
        <div className='overflow-x-auto'>
          <Table>
            <Table.Head>
              <Table.HeadCell>Responsable</Table.HeadCell>
              <Table.HeadCell>Metodo de Pago</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Num. Operacion</Table.HeadCell>
              <Table.HeadCell>Total</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {detail?.user.fullName}
                </Table.Cell>
                <Table.Cell>{detail?.paymentMethod}</Table.Cell>
                <Table.Cell>
                  {detail?.status ? "PAGADA" : "NO PAGADO"}
                </Table.Cell>
                <Table.Cell>{detail?.date}</Table.Cell>
                <Table.Cell>{detail?.numOperation}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {detail?.totalInvoice}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Card>
      <hr className='pt-4 pb-4' />
      <Card className='max-h-[350px] overflow-y-scroll'>
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Nombre del Producto</Table.HeadCell>
              <Table.HeadCell>Cantidad</Table.HeadCell>
              <Table.HeadCell>Unit. Precio</Table.HeadCell>
              <Table.HeadCell>Total por Producto</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {detail &&
                detail.detail_invoice.map((invoice, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {invoice.products.name}
                    </Table.Cell>
                    <Table.Cell>{invoice.quantity}</Table.Cell>
                    <Table.Cell>{invoice.unitPrice}</Table.Cell>
                    <Table.Cell>{invoice.totalLine}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default DetailInvoice;
