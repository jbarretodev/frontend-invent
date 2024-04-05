import { useEffect, useState } from "react";
import { OperationCreate, Product } from "../../@types";
import { Select, Label, TextInput, Button, Card } from "flowbite-react";
import ProductRequest from "../../api/products";
import OperationInventory from "../../api/OperationEnventory";
import toast from "react-hot-toast";

const InventoryForm = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [operation, setOperation] = useState<OperationCreate>({
    type_op: 1,
    quantity: 0,
    product_id: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setOperation({ ...operation, [name]: value });
  };

  const sendOperation = async () => {

    if (operation.quantity === 0) {
      toast.error("Ingrese la cantidad del producto!", {
        duration: 5000,
      })
      return 
    }

    const rs = await OperationInventory.saveOperation(operation);

    if (rs.status === 201) {
      toast.success("Operacion registrada exitosamente", { duration: 5000 });
      setOperation({
        type_op: 0,
        quantity: 0,
        product_id: 0,
      });
    }

    if (rs.status === 400) {
      toast.error("No suficiente cantidad para esta operacion!", {
        duration: 5000,
      });
      setOperation({
        type_op: 0,
        quantity: 0,
        product_id: 0,
      });
    }

    if (rs.status === 404) {
      toast.error("Producto no encontrado!", {
        duration: 5000,
      });
      setOperation({
        type_op: 0,
        quantity: 0,
        product_id: 0,
      });
    }
  };

  useEffect(() => {
    ProductRequest.getProducts().then((rs) => {
      if (rs.status === 200 && Array.isArray(rs.data.products)) {
        setListProduct(rs.data.products);
        setOperation({...operation,product_id:rs.data.products[0].id})
      }
    });
  }, []);

  return (
    <>
      <h3 className='text-3xl font-bold mb-4 text-center mt-10'>
        Registro de Actividad de Inventario
      </h3>
      <div className='flex items-center justify-center h-screen -mt-40'>
        <Card className='w-1/2'>
          <form>
            <div className='mb-4'>
              <Label htmlFor='product_id' value='Seleccione el producto' />
              {listProduct.length > 0 && (
                <Select
                  defaultValue={listProduct[0].id}
                  onChange={handleInputChange}
                  name='product_id'
                  id='product_id'
                >
                  {listProduct.map((product: Product) => (
                    <option key={product.code} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              )}
            </div>

            <div className='mb-4'>
              <Label htmlFor='action' value='Seleccione la operacion' />
              <Select defaultValue={1} onChange={handleInputChange} name='type_op' id='action'>
                <option value={1}>Agregar</option>
                <option value={0}>
                  Retirar
                </option>
              </Select>
            </div>

            <div className='mb-4'>
              <Label
                htmlFor='quantity'
                value='Cantidad por unidad o por kilo'
              />
              <TextInput
                onChange={handleInputChange}
                id='quantity'
                name='quantity'
                type='text'
                sizing='md'
              />
            </div>
            <Button onClick={sendOperation} className='w-full'>
              Registrar Operacion
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default InventoryForm;
