import { Button, Label, TextInput, Card } from "flowbite-react";
import React, { useState } from "react";
import { ProductCreate } from "../../@types";
import toast from "react-hot-toast";
import ProductRequest from "../../api/products";


interface FormProductProps {
  onProductAdded: () => void;
}

const FormProduct: React.FC<FormProductProps> = ({onProductAdded}) => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    quantity: 0,
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const cleanForm = () => {
    setProduct({
      name: "",
      quantity: 0,
      price: 0,
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

    const rs = await ProductRequest.createProduct(product);

    if (rs.status === 201) {
      toast.success("Producto Guardado exitisamente!", { duration: 5000 });
      cleanForm();
      onProductAdded()
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
            <Button onClick={submitFormProduct}>Registrar Producto</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default FormProduct;
