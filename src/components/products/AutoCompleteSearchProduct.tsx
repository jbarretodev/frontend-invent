import React, { useEffect } from "react";
import { ListProducts, Product } from "../../@types";
import { Label, Select } from "flowbite-react";

interface AutoCompleteProp {
  listProducts: ListProducts;
  onProductSelected: (product: Product) => void;
}
const AutoCompleteSearchProduct: React.FC<AutoCompleteProp> = ({
  listProducts,
  onProductSelected,
}: AutoCompleteProp ) =>
{
  
  useEffect(() => {
    onProductSelected(listProducts.products[0]);
  }, [listProducts]);

  const setProductOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = JSON.parse(e.target.value) as Product;
    onProductSelected(product);
  };

  return (
    <>
      <div className='max-w-md'>
        <div className='mb-2 block'>
          <Label htmlFor='prod' value='seleccione el producto!' />
        </div>
        <Select id='countries' onChange={setProductOnChange}>
          {listProducts.products.map((product) => (
            <option key={product.id} value={JSON.stringify(product)}>
              {product.name}
            </option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default AutoCompleteSearchProduct;
