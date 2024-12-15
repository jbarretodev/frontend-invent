import { useEffect, useState } from "react";
import InvoiceRequest from "../../api/Invoice";
import { Card, Button } from "flowbite-react";
import { Table } from "flowbite-react";
import { Blockquote } from "flowbite-react";
import { Label, Modal, TextInput } from "flowbite-react";
import { Select } from "flowbite-react";
import { DetailInvoiceInter } from "../../@types";
import toast from "react-hot-toast";

interface DetailInvoiceProp {
  id: number;
}

const DetailInvoice = ({ id }: DetailInvoiceProp) => {
  const [detail, setDetail] = useState<DetailInvoiceInter>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("biopago");
  const [reference, setReference] = useState<string>("");

  useEffect(() => {
    InvoiceRequest.getInvoiceDetailById(id).then((rs) => {
      setDetail(rs.data);
    });
    //.catch((err) => setDetail([]));
  }, [id]);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const payDebt = () => {
    InvoiceRequest.payDebt(detail!.id, {
      paymentMethod: paymentMethod,
      reference: reference,
    })
      .then((rs) => {
        if ( rs )
        {
          setDetail( rs );
          onCloseModal()
          toast.success("Pago realizado con exito!");
        } else {
          toast.error("Ha ocurrido un error! Intente luego");
        }
      })
      .catch((_err) => {
        toast.error("Ha ocurrido un error! Intente luego");
      });
  };

  return (
    <>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Responsable</Table.HeadCell>
              <Table.HeadCell>Método de Pago</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Num. Operación</Table.HeadCell>
              <Table.HeadCell>Total Neto</Table.HeadCell>
              <Table.HeadCell>SubTotal</Table.HeadCell>
              <Table.HeadCell>Total</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {detail && (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {detail?.user.fullName}
                  </Table.Cell>
                  <Table.Cell>{detail?.paymentMethod}</Table.Cell>
                  <Table.Cell>
                    {detail?.status ? "PAGADA" : "NO PAGADO"}
                  </Table.Cell>
                  <Table.Cell>{detail?.date}</Table.Cell>
                  <Table.Cell>{detail?.numOperation}</Table.Cell>
                  <Table.Cell>
                    {Number(detail?.totalInvoice - detail?.subtotal).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell>{detail?.subtotal}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {detail?.totalInvoice}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>
      <hr className="pt-4 pb-4" />
      <Card className="max-h-[350px] overflow-y-scroll">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Nombre del Producto</Table.HeadCell>
              <Table.HeadCell>Cantidad</Table.HeadCell>
              <Table.HeadCell>Unit. Precio</Table.HeadCell>
              <Table.HeadCell>Total por Producto</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {detail &&
                detail.detail_invoice.map((invoice, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Pago de Deuda
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="v" value="Metodo de pago" />
              </div>
              <Select
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="methodPayment"
                required
              >
                <option value={"biopago"}>Biopago</option>
                <option value={"TDD"}>TDD</option>
                <option value={"Bs Efectivo"}>Bs Efectivo</option>
                <option value={"$ Efectivo"}>$ Efectivo</option>
                <option value={"TDC"}>TDC</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="reference" value="Referencia" />
              </div>
              <div>
                <TextInput
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  id="reference"
                  type="text"
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="total" value="Total a Pagar" />
              </div>
              <div>
                <TextInput id="total" disabled value={detail?.totalInvoice} />
              </div>
            </div>
            <div className="w-full">
              <Button
                onClick={() => {
                  payDebt();
                }}
                type="button"
              >
                Pagar Dedua
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {!detail?.status && (
        <div>
          <Blockquote>
            <p className="mt-5">
              Esta venta aun no ha sido pagada, haga click en el boton de abajo
              para pagarla.
            </p>
          </Blockquote>
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            className="mt-5"
            size="md"
          >
            Pagar Deuda!
          </Button>
        </div>
      )}
    </>
  );
};

export default DetailInvoice;
