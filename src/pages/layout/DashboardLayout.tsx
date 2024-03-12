import React from "react";
import BeSide from "../../components/shared/BeSide";
import { LayoutProps } from "../../@types";

const DashboardLayout = (props: LayoutProps) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4">
        <BeSide />
      </div>
      <div className="col-span-12 md:col-span-8">{props.children}</div>
    </div>
  );
};

export default DashboardLayout;
