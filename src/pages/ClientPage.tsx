import ListClient from "../components/clients/ListClient";
import DashboardLayout from "./layout/DashboardLayout";

const ClientPage = () => {
  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-20 mt-20">
          Listado de clientes
        </h3>
        <ListClient />
      </DashboardLayout>
    </>
  );
};

export default ClientPage;
