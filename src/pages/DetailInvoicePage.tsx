//import React from 'react'
import DetailInvoice from "../components/invoices/DetailInvoice";
import DashboardLayout from "./layout/DashboardLayout";
import { useParams } from "react-router-dom";

const DetailInvoicePage = () => {
  const { id } = useParams();
  return (
    <>
      <DashboardLayout>
        <h3 className='text-3xl font-bold mb-4 text-center mb-20 mt-20'>
          Detalle de la Venta
        </h3>
        {id && <DetailInvoice id={Number(id)} />}
      </DashboardLayout>
    </>
  );
};

export default DetailInvoicePage;
