import { useParams } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import { useEffect, useState } from "react";
import ClientRequest from "../api/client";
import { ClientInvoices } from "../@types";
import ClientInvoicesComponent from "../components/clients/ClientInvoices";

const InvoiceByClientPage = () => {
  const { id } = useParams();
  const [clientInvoice, setClientInvoice] = useState<ClientInvoices>();

  useEffect(() => {
    ClientRequest.getClientInvoice(Number(id))
      .then((rs) => {
        //console.log(rs);
        setClientInvoice(rs as ClientInvoices);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold text-center mb-20 mt-20">
          Listado de compras del cliente: {clientInvoice?.fullName}
        </h3>
        {clientInvoice && <ClientInvoicesComponent fullName={clientInvoice.fullName} invoices={clientInvoice.invoices} />}
      </DashboardLayout>
    </>
  );
};

export default InvoiceByClientPage;
