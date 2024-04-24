import InvoicesNotPaid from "../components/invoices/InvoicesNotPaid";
import DashboardLayout from "./layout/DashboardLayout";

const InvoicesNotPaidPage = () => {
  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-20 mt-20">
          Ventas por Cobrar
        </h3>
        <InvoicesNotPaid />
      </DashboardLayout>
    </>
  );
};

export default InvoicesNotPaidPage;
