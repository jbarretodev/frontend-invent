import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainAdmin from "./pages/MainAdmin";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ProductPage from "./pages/ProductPage";
import InventPage from "./pages/InventoryPage";
import ListOperationInventoryPage from "./pages/ListOperationInventoryPage";
import InvoicePage from "./pages/InvoicePage";
import ListInvoicePage from "./pages/ListInvoicePage";
import DetailInvoice from "./pages/DetailInvoicePage";
import InvoiceConsolidatePage from "./pages/InvoiceConsolidatePage";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='dashboard' element={<ProtectedRoute />}>
            <Route path='' element={<MainAdmin />} />
            <Route path='products' element={<ProductPage />} />
            <Route path='invent' element={<InventPage />} />
            <Route
              path='invent/list'
              element={<ListOperationInventoryPage />}
            />
            <Route path='invoice' element={<InvoicePage />}></Route>
            <Route path='invoice/list' element={<ListInvoicePage />}></Route>
            <Route path='invoice/:id' element={<DetailInvoice />}></Route>
            <Route
              path='invoice/consolidate'
              element={<InvoiceConsolidatePage />}
            ></Route>
          </Route>
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
