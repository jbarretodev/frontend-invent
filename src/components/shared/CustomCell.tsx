//import React from 'react'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

interface CustomCellProps {
  id: number;
}

const CustomCell = ({ id }: CustomCellProps) => {
  return (
    <>
      <Button outline gradientDuoTone='cyanToBlue'>
        <Link to={`/dashboard/invoice/${id}`}>Ver Detalles!</Link>
      </Button>
    </>
  );
};

export default CustomCell;
