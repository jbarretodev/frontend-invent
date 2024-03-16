import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  //HiShoppingBag,
  //HiTable,
  HiUser,
  HiOutlineClipboardList,
  HiShoppingCart,
  HiCreditCard,
} from "react-icons/hi";
const BeSide = () => {
  return (
    <>
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse
              label="Ventas"
              href="#"
              icon={HiCreditCard}
            >
              <Sidebar.Item>
                Registrar Venta
              </Sidebar.Item>
              <Sidebar.Item>
                Consultar Venta
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Productos" href="#" icon={HiShoppingCart}>
              <Sidebar.Item href="/dashboard/products">
                Registrar Productosr
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse
              label="Inventario"
              href="#"
              icon={HiOutlineClipboardList}
            >
              <Sidebar.Item href="/dashboard/invent">
                Registrar Actividad
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/invent/list">
                Listado de Inventario
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Cerrar Sesion
            </Sidebar.Item>
            {/* <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default BeSide;
