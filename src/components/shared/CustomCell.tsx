//import React from 'react'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

interface CustomCellProps {
  id: number;
  route: string;
  message: string;
}

const CustomCell = ({ id,route, message }: CustomCellProps) => {
  return (
    <>
      <Button outline gradientDuoTone='cyanToBlue'>
        <Link to={`${route}/${id}`}>{ message }</Link>
      </Button>
    </>
  );
};

export default CustomCell;
