//import React from "react";
import FormProduct from "../components/products/FormProduct";
import DashboardLayout from "./layout/DashboardLayout";

const ProductPage = () => {
  return (
    <>
      <DashboardLayout>
        <h3>Registro de productos</h3>
        <FormProduct />
      </DashboardLayout>
    </>
  );
};

export default ProductPage;
