//import React from "react";
import CommerceComponent from "../components/commerce/CommerceComponent";
import DashboardLayout from "./layout/DashboardLayout";
import { Suspense } from "react";

const InfoCommercePage = () => {
  return (
    <>
      <DashboardLayout>
        <h3 className="text-3xl font-bold mb-4 text-center mb-20 mt-20">
          Información de su Comercio
        </h3>
        <Suspense fallback={<p>Loading...</p>}>
          <CommerceComponent />
        </Suspense>
      </DashboardLayout>
    </>
  );
};

export default InfoCommercePage;
