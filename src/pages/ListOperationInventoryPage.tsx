import { useState } from "react";
import ListInvotory from "../components/inventory/ListInvotory"
import DashboardLayout from "./layout/DashboardLayout"
import { Datepicker } from "flowbite-react";

const ListOperationInventoryPage = () => {
  const [date, setDate] = useState(new Date());
  
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
              Listado de Actividad del Inventario
            </h3>
          </div>
          <div></div>
        </div>
        <ListInvotory date={date.toISOString()} />
      </DashboardLayout>
    </>
  );
}

export default ListOperationInventoryPage
