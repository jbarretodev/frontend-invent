import {
  Button,
  Label,
  TextInput,
  Card,
  Select,
  ToggleSwitch,
} from "flowbite-react";
import React, { useState } from "react";
import { ProductCreate } from "../../@types";
import toast from "react-hot-toast";
import ProductRequest from "../../api/products";

interface FormProductProps {
  onProductAdded: () => void;
}

const FormProduct: React.FC<FormProductProps> = ({ onProductAdded }) => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    quantity: 0,
    price: 0,
    sell_by: "by_kilo",
    exempt: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const cleanForm = () => {
    setProduct({
      name: "",
      quantity: 0,
      price: 0,
      sell_by: "",
      exempt: false,
    });
  };

  const submitFormProduct = async () => {
    if (product.name.trim() === "") {
      toast.error("Error el nombre del producto no puede quedar vacio");
      return false;
    }

    if (product.quantity < 1) {
      toast.error("Error! El numero del producto tiene que se mayor que 1");
      return false;
    }

    if (product.price < 0) {
      toast.error("Error! El precio tiene que se mayor o igual que 1");
      return false;
    }

    if (product.sell_by === "-") {
      toast.error("Error! Seleccione un modo de venta");
      return false;
    }

    const rs = await ProductRequest.createProduct(product);

    if (rs.status === 201) {
      toast.success("Producto Guardado exitisamente!", { duration: 5000 });
      cleanForm();
      onProductAdded();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full mb-10">
        <Card className="w-full md:max-w-xl flex flex-col gap-4 p-4">
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" value="Nombre del producto" />
              <TextInput
                value={product.name}
                name="name"
                onChange={handleInputChange}
                id="product"
                type="text"
                placeholder=""
                shadow
              />
            </div>
            <div>
              <Label htmlFor="price" value="Precio del producto" />
              <TextInput
                value={product.price}
                name="price"
                onChange={handleInputChange}
                id="price"
                type="text"
                placeholder="0.00"
                shadow
              />
            </div>
            <div>
              <Label htmlFor="quantity" value="Cantidad" />
              <TextInput
                id="quantity"
                type="string"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                shadow
              />
            </div>
            <div className="max-w-xl">
              <div className="mb-2 block">
                <Label htmlFor="sell_by" value="Modo de Venta" />
              </div>
              <Select
                id="sell_by"
                defaultValue={"by_kilo"}
                name="sell_by"
                onChange={handleInputChange}
              >
                <option value={"by_kilo"}>Por Kilo</option>
                <option value={"by_unit"}>Por Unidad</option>
              </Select>
              <div className="mt-3">
                <ToggleSwitch
                  checked={product.exempt}
                  label="Aplicar Iva para este Producto"
                  name="exempt"
                  onChange={() => {
                    setProduct({ ...product, exempt: !product.exempt });
                  }}
                />
              </div>
            </div>
            <Button onClick={submitFormProduct}>Registrar Producto</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default FormProduct;
