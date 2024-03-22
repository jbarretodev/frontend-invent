import ConsolidateInvoice from "../components/invoices/ConsolidateInvoice";
import DashboardLayout from "./layout/DashboardLayout";
import { useState } from "react";
import { Datepicker } from "flowbite-react";
const InvoiceConsolidatePage = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      <DashboardLayout>
        <div className='grid grid-cols-3'>
          <div>
            <Datepicker
              language={"es-ES"}
              onSelectedDateChanged={(value: Date) => setDate(value)}
              className='mt-20'
              title='Fecha de Ventas'
            />
          </div>
          <div>
            <h3 className='text-3xl font-bold text-center mt-20 mb-20'>
              Ventas Consolida
            </h3>
          </div>
          <div></div>
        </div>
        <ConsolidateInvoice date={date} />
      </DashboardLayout>
    </>
  );
};

export default InvoiceConsolidatePage;
