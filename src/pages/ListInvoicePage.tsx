import { useState } from "react";
import ListInvoices from "../components/invoices/ListInvoices";
import DashboardLayout from "./layout/DashboardLayout";
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";

const ListInvoicePage = () => {
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
            <h3 className='text-3xl font-bold mb-4 text-center mb-20 mt-20'>
              Listado de Ventas para la fecha:{" "}
              {dayjs(date).format("DD/MM/YYYY")}
            </h3>
          </div>
          <div></div>
        </div>

        <ListInvoices dateSearch={dayjs(date).format("YYYY/MM/DD")} />
      </DashboardLayout>
    </>
  );
};

export default ListInvoicePage;
