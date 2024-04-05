//import React from 'react'

import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

interface CustomCellProps {
  id: number;
  route: string;
  message: string;
  type?: number; // 1 to list invoice by clients
}

const CustomCell = ({ id, route, message, type }: CustomCellProps) => {
  //const [url, setUrl] = useState<string>(`${route}/${id}`);
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
        <Link to={url}>{message}</Link>
      </Button>
    </>
  );
};

export default CustomCell;
