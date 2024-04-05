import FormInvoice from "../components/invoices/FormInvoice";
import DashboardLayout from "./layout/DashboardLayout";
const InvoicePage = () => {
  return (
    <>
      <DashboardLayout>
        <FormInvoice />
      </DashboardLayout>
    </>
  );
};

export default InvoicePage;
