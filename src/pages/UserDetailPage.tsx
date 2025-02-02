import { useParams } from "react-router-dom";
import UserDetail from "../components/user/UserDetail";
import DashboardLayout from "./layout/DashboardLayout";

const UserDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-20 mt-20">
          Actualizacion de Usuario
        </h3>
        <UserDetail id={Number(id)} />
      </DashboardLayout>
    </>
  );
};

export default UserDetailPage;
