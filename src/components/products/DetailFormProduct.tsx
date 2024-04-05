import { useEffect, useState } from "react";
import { Button, Label, TextInput, Card, Select } from "flowbite-react";
import ProductRequest from "../../api/products";
import { Product } from "../../@types";
import toast from "react-hot-toast";

interface DetailProductProp {
  id: number;
}

const DetailFormProduct = ({ id }: DetailProductProp) => {
  const [product, setProduct] = useState<Product>({
    code: "",
    name: "",
    price: 0,
    createdAt: "",
    quantity: 0,
    id: 0,
    sell_by: "",
    updatedAt: "",
  });

  useEffect(() => {
    ProductRequest.getProduct(id)
      .then((rs) => setProduct(rs.data))
      .catch((err) => console.log(err));
  }, [id]);

  const triggerUpdatePrice = () => {
    ProductRequest.updatePriceProduct(product.id, Number(product.price)).then(
      (__rs) =>
        toast.success("Precio Actualizado Exitosamente", {
          duration: 5000,
        })
    );
  };

  const triggerUpdateName = () => {
    ProductRequest.updateNameProduct(product.id, product.name).then((__rs) =>
      toast.success("Nombre Actualizado Exitosamente", {
        duration: 5000,
      })
    );
  };

  const triggerUpdateSellBy = () => {
    ProductRequest.updateSellByProduct(product.id, product.sell_by).then(
      (__rs) =>
        toast.success("Mode de Venta Actualizado Exitosamente", {
          duration: 5000,
        })
    );
  };

  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateSellBy = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='flex justify-center items-center h-full mb-10'>
        <Card className='w-full md:max-w-xl flex flex-col gap-4 p-4'>
          <form className='flex flex-col gap-4'>
            <div className='grid md:grid-cols-2'>
              <div>
                <Label htmlFor='name' value='Nombre del producto' />
                <TextInput
                  name='name'
                  value={product?.name}
                  onChange={updateName}
                  id='name'
                  type='text'
                  placeholder=''
                  shadow
                />
              </div>
              <div onClick={triggerUpdateName} className='mt-6'>
                <Button>Actualizar Nombre</Button>
              </div>
            </div>

            <div className='grid md:grid-cols-2'>
              <div>
                <Label htmlFor='price' value='Precio del producto' />
                <TextInput
                  name='price'
                  value={product?.price}
                  onChange={updatePrice}
                  id='price'
                  type='text'
                  placeholder='0.00'
                  shadow
                />
              </div>
              <div className='mt-6'>
                <Button onClick={triggerUpdatePrice}>Actualizar Precio</Button>
              </div>
            </div>

            <div className='grid md:grid-cols-2'>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='sell_by' value='Modo de Venta' />
                </div>
                <Select
                  id='sell_by'
                  onChange={updateSellBy}
                  value={product?.sell_by}
                  name='sell_by'
                >
                  <option value={"by_kilo"}>Por Kilo</option>
                  <option value={"by_unit"}>Por Unidad</option>
                </Select>
              </div>
              <div className='mt-8 w-full'>
                <Button onClick={triggerUpdateSellBy}>
                  Actualizar modo de Ventar
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default DetailFormProduct;
