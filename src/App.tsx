import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainAdmin from "./pages/MainAdmin";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<ProtectedRoute />}>
            <Route path="" element={<MainAdmin />} />
            <Route path="products" element={<ProductPage />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
