import FormInvoice from "../components/invoices/FormInvoice";
import DashboardLayout from "./layout/DashboardLayout";
const InvoicePage = () => {
  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-20 mt-20">
          Registrar una nueva Compra
        </h3>
        <FormInvoice />
      </DashboardLayout>
    </>
  );
};

export default InvoicePage;
