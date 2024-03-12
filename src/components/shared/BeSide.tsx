import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiOutlineClipboardList,
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
            <Sidebar.Collapse label="Productos" href="#" icon={HiOutlineClipboardList}>
              <Sidebar.Item href="/dashboard/products">
                Registrar Productos
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
