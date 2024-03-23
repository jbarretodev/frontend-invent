//import React from 'react'
import { useParams } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout"
import DetailFormProduct from "../components/products/DetailFormProduct";

const DetailProductPage = () => {
  const {id} = useParams()
  return (
    <>
      <DashboardLayout>
        <h3 className='text-3xl font-bold mb-4 text-center mb-20 mt-20'>
          Detalle del Producto
        </h3>
        <DetailFormProduct id={Number(id)}/>
      </DashboardLayout>
    </>
  );
}

export default DetailProductPage