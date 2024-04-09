import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

interface CustomCellProps {
  id: number;
  route?: string;
  message: string;
  type?: number; // 1 to list invoice by clients
  handlerClick?: () => void;
}

const CustomCell = ({
  id,
  route,
  message,
  type,
  handlerClick,
}: CustomCellProps) => {
  let url: string = "";

  switch (type) {
    case 1:
      url = `${route}`;
      break;
    default:
      url = `${route}/${id}`;
  }
  return (
    <>
      <Button outline gradientDuoTone="purpleToBlue">
        {route ? (
          <Link to={url}>{message}</Link>
        ) : (
          <span onClick={handlerClick}>{message}</span>
        )}
      </Button>
    </>
  );
};

export default CustomCell;
