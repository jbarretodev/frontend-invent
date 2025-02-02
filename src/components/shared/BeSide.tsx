import { useEffect, useState, useMemo } from "react";
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

// Tipos
type UserRole = "ADMIN" | "SELLER" | "INVENT";

interface User {
  role: { name: UserRole };
}

// Hook personalizado para obtener el rol del usuario
const useUserRole = (): UserRole => {
  const [role, setRole] = useState<UserRole>("SELLER");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userLogged = JSON.parse(storedUser) as User;
        if (
          userLogged?.role?.name &&
          ["ADMIN", "SELLER", "INVENT"].includes(userLogged.role.name)
        ) {
          setRole(userLogged.role.name);
        } else {
          setRole("SELLER"); // Rol predeterminado si no es válido
        }
      } else {
        setRole("SELLER");
      }
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
      setRole("SELLER");
    }
  }, []);

  return role;
};

// Componente principal
const BeSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const role = useUserRole();

  // Función para generar las opciones del menú según el rol
  const getMenuItems = (role: UserRole) => {
    const adminMenu = [
      <Sidebar.Item href="/dashboard" icon={HiChartPie}>
        Dashboard
      </Sidebar.Item>,
      <Sidebar.Collapse label="Ventas" href="#" icon={HiCreditCard}>
        <Sidebar.Item href="/dashboard/invoice">Registrar Venta</Sidebar.Item>
        <Sidebar.Item href="/dashboard/invoice/list">
          Listado de Ventas
        </Sidebar.Item>
        <Sidebar.Item href="/dashboard/invoice/consolidate">
          Ventas Consolidadas
        </Sidebar.Item>
        <Sidebar.Item href="/dashboard/invoice/not-paid">
          Ventas por Cobrar
        </Sidebar.Item>
      </Sidebar.Collapse>,
      <Sidebar.Collapse label="Productos" href="#" icon={HiShoppingCart}>
        <Sidebar.Item href="/dashboard/products">
          Registrar Productos
        </Sidebar.Item>
      </Sidebar.Collapse>,
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
      </Sidebar.Collapse>,
      <Sidebar.Item href="/dashboard/clients" icon={HiOutlineUsers}>
        Clientes
      </Sidebar.Item>,
      <Sidebar.Item href="/dashboard/users" icon={HiOutlineUsers}>
        Usuarios
      </Sidebar.Item>,
      <Sidebar.Item href="/dashboard/commerce" icon={FaStore}>
        Info. del Comercio
      </Sidebar.Item>,
      <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={() => logOut()}>
        Cerrar Sesión
      </Sidebar.Item>,
    ];

    const sellerMenu = [
      <Sidebar.Item href="/dashboard" icon={HiChartPie}>
        Dashboard
      </Sidebar.Item>,
      <Sidebar.Collapse label="Ventas" href="#" icon={HiCreditCard}>
        <Sidebar.Item href="/dashboard/invoice">Registrar Venta</Sidebar.Item>
        <Sidebar.Item href="/dashboard/invoice/list">
          Listado de Ventas
        </Sidebar.Item>
        <Sidebar.Item href="/dashboard/invoice/consolidate">
          Ventas Consolidadas
        </Sidebar.Item>
        <Sidebar.Item href="/dashboard/invoice/not-paid">
          Ventas por Cobrar
        </Sidebar.Item>
      </Sidebar.Collapse>,
      <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={() => logOut()}>
        Cerrar Sesión
      </Sidebar.Item>,
    ];

    const inventMenu = [
      <Sidebar.Item href="/dashboard" icon={HiChartPie}>
        Dashboard
      </Sidebar.Item>,
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
      </Sidebar.Collapse>,
      <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={() => logOut()}>
        Cerrar Sesión
      </Sidebar.Item>,
    ];

    switch (role) {
      case "ADMIN":
        return adminMenu;
      case "SELLER":
        return sellerMenu;
      case "INVENT":
        return inventMenu;
      default:
        return [];
    }
  };

  // Memoización de las opciones del menú
  const menuItems = useMemo(() => getMenuItems(role), [role]);

  return (
    <div className="flex">
      {/* Botón de Toggle para móviles */}
      <button
        className="p-2 text-gray-500 rounded-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
        aria-expanded={isOpen}
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
          <Sidebar.ItemGroup>{menuItems}</Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default BeSide;
