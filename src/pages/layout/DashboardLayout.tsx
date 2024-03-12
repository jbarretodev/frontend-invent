import React from "react";
import BeSide from "../../components/shared/BeSide";
import { LayoutProps } from "../../@types";

const DashboardLayout = (props: LayoutProps) => {
  return (
    <div className="flex">
      {/* Panel lateral a la izquierda */}
      <div className="flex-shrink-0">
        <BeSide />
      </div>

      {/* Contenido principal centrado */}
      <div className="flex-grow flex justify-center items-center">
        <div className="max-w-screen-lg w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
