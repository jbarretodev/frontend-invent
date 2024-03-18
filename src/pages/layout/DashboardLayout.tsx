import BeSide from "../../components/shared/BeSide";
import { LayoutProps } from "../../@types";

const DashboardLayout = (props: LayoutProps) => {
  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0">
        <BeSide />
      </div>

      <div className="flex-grow flex justify-center items-center">
        <div className="max-w-screen-xxl w-full gap-2">{props.children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
