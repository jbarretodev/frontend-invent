import { useEffect, useState } from "react";
import ProductRequest from "../../api/products";
import { Product, DataProductRow } from "../../@types";
import toast from "react-hot-toast";
import DataTable, { TableColumn } from "react-data-table-component";
import { getFieldTableProduct } from "../../utils.ts";
import SpinnerLocal from "../shared/Spinner.tsx";

type Props = {
  className: string;
  reloadFlag: boolean;
};

const ListProduct = ({ className, reloadFlag }: Props) => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [dataTableProduct, setDataTableProduct] = useState<DataProductRow[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const columns: TableColumn<DataProductRow>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cantidad Disponible",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Fecha de Registro",
      selector: (row) => row.createdAt,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rs = await ProductRequest.getProducts();
        if (rs.status === 200 && Array.isArray(rs.data.products)) {
          toast.success("Productos Listados!", { duration: 5000 });
          setListProduct(rs.data.products);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Ha ocurrido un error obteniendo productos!", {
          duration: 5000,
        });
      }
    };

    fetchData();
  }, [reloadFlag]);

  useEffect(() => {
    if (listProduct.length > 0) {
      const dataRow = getFieldTableProduct(listProduct);
      setDataTableProduct(dataRow);
    }
  }, [listProduct]);

  return (
    <div className={className}>
      {isLoading ? (
        <SpinnerLocal />
      ) : (
        <DataTable columns={columns} data={dataTableProduct} />
      )}
    </div>
  );
};

export default ListProduct;
