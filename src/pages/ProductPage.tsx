//import React from "react";
import FormProduct from "../components/products/FormProduct";
import ListProduct from "../components/products/ListProduct";
import DashboardLayout from "./layout/DashboardLayout";
import { useState } from "react";

const ProductPage = () => {
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);
  
  const reloadProduct = () =>
  {
    setReloadFlag(!reloadFlag);
  };
  
  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-30">
          Registro de productos
        </h3>

        <FormProduct onProductAdded={reloadProduct} />
        <hr />
        <ListProduct className={"mt-10"} reloadFlag={reloadFlag} />
      </DashboardLayout>
    </>
  );
};

export default ProductPage;
