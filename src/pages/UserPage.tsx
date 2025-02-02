import DashboardLayout from "./layout/DashboardLayout";
import UserList from "../components/user/UserList";
import { UserCreate } from "../components/user/UserCreate";
import { useState } from "react";
const UserPage = () => {
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  const reloadProduct = () => {
    setReloadFlag(!reloadFlag);
  };
  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-20 mt-20">
          Gestión de Usuarios
        </h3>
        <UserCreate onNewUserCreated={reloadProduct} />
        <hr />

        <UserList reloadFlag={reloadFlag} />
      </DashboardLayout>
    </>
  );
};

export default UserPage;
