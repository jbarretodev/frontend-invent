import InventoryForm from "../components/inventory/InventoryForm";
import DashboardLayout from "./layout/DashboardLayout";
const InventPage = () => {
  return (
    <>
      <DashboardLayout>
        <InventoryForm />
      </DashboardLayout>
    </>
  );
};

export default InventPage;
