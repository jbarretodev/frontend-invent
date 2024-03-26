import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  //HiInbox,
  //HiShoppingBag,
  //HiTable,
  //HiUser,
  HiOutlineClipboardList,
  HiShoppingCart,
  HiCreditCard,
} from "react-icons/hi";
import { logOut } from "../../utils.ts";
const BeSide = () => {
  return (
    <>
      <Sidebar aria-label='Default sidebar example'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href='/dashboard' icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse label='Ventas' href='#' icon={HiCreditCard}>
              <Sidebar.Item href='/dashboard/invoice'>
                Registrar Venta
              </Sidebar.Item>
              <Sidebar.Item href='/dashboard/invoice/list'>
                Listado de Ventas
              </Sidebar.Item>
              <Sidebar.Item href='/dashboard/invoice/consolidate'>
                Ventas Consolidadas
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label='Productos' href='#' icon={HiShoppingCart}>
              <Sidebar.Item href='/dashboard/products'>
                Registrar Productos
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse
              label='Inventario'
              href='#'
              icon={HiOutlineClipboardList}
            >
              <Sidebar.Item href='/dashboard/invent'>
                Registrar Actividad
              </Sidebar.Item>
              <Sidebar.Item href='/dashboard/invent/list'>
                Listado de Actividades
              </Sidebar.Item>
            </Sidebar.Collapse>
            {/* <Sidebar.Item href='#' icon={HiInbox} label='3'>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiUser}>
              Users
            </Sidebar.Item> */}
            <Sidebar.Item
              href='#'
              icon={HiArrowSmRight}
              onClick={() => {
                logOut();
              }}
            >
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
