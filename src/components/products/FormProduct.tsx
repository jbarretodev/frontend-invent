import { Button, Label, TextInput, Card } from "flowbite-react";
import { useState } from "react";
import { ProductCreate } from "../../@types";
import toast from "react-hot-toast";
import ProductRequest from "../../api/products";

const FormProduct = () => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    quantity: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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

    const rs = await ProductRequest.createProduct( product )
    console.log(rs)
  };

  return (
    <>
      <Card className="flex max-w-md flex-col mt-20">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nombre del producto" />
            </div>
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
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Cantidad" />
            </div>
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
    </>
  );
};

export default FormProduct;
