import { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiOutlineClipboardList,
  HiShoppingCart,
  HiCreditCard,
  HiOutlineUsers,
  HiMenu,
} from "react-icons/hi";
import { FaStore } from "react-icons/fa6";
import { logOut } from "../../utils.ts";

const BeSide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Botón de Toggle para móviles */}
      <button
        className="p-2 text-gray-500 rounded-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <HiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar Responsivo */}
      <Sidebar
        aria-label="Default sidebar example"
        className={`fixed top-0 left-0 h-full z-40 bg-white shadow-md transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:block`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>

            <Sidebar.Collapse label="Ventas" href="#" icon={HiCreditCard}>
              <Sidebar.Item href="/dashboard/invoice">
                Registrar Venta
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/invoice/list">
                Listado de Ventas
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/invoice/consolidate">
                Ventas Consolidadas
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/invoice/not-paid">
                Ventas por Cobrar
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse label="Productos" href="#" icon={HiShoppingCart}>
              <Sidebar.Item href="/dashboard/products">
                Registrar Productos
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
                Listado de Actividades
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item href="/dashboard/clients" icon={HiOutlineUsers}>
              Clientes
            </Sidebar.Item>
            <Sidebar.Item href="/dashboard/commerce" icon={FaStore}>
              Info. del Comercio
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
              onClick={() => logOut()}
            >
              Cerrar Sesión
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default BeSide;
