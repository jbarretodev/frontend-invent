import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  //Checkbox,
  //FileInput,
  Label,
  //Radio,
  //RangeSlider,
  Select,
  //Textarea,
  TextInput,
  ToggleSwitch,
  Card,
} from "flowbite-react";
import {
  Detail,
  DetailInvoiceRow,
  ListProducts,
  Product,
  Purchase,
} from "../../@types";
import ProductRequest from "../../api/products";
import AutoCompleteSearchProduct from "../products/AutoCompleteSearchProduct";
import InvoiceRequest from "../../api/Invoice";
import toast from "react-hot-toast";

const FormInvoice = () => {
  const [details, setDetails] = useState<DetailInvoiceRow[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [listProducts, setListProducts] = useState<ListProducts>();
  const [searcher, setSearcher] = useState<string>("");
  const [value] = useDebounce(searcher, 1000);
  const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<Product>();
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [total, setTotal] = useState<number>(0.0);
  const [quantity, setQuantity] = useState<string>("");
  const [numOperation, setNumOperation] = useState<string>("");
  const [_typeOperation, setTypeOperation] = useState<string>("");

  const getProductSelected = (product: Product) => {
    setProductSelected(product);
    setQuantityProduct(product.quantity);
  };

  const addRowDetailInvoice = () => {
    if (productSelected) {
      const detail: DetailInvoiceRow = {
        id: productSelected.id,
        name: productSelected.name,
        price: productSelected.price,
        quantity: Number(quantity),
        total: productSelected.price * Number(quantity),
      };

      setDetails([...details, detail]);
    }
  };

  const removeitemDetails = (id: number) => {
    setDetails(details.filter((row) => row.id !== id));
  };

  const saveNewPurshase = async () => {
    const dataInvoice: Purchase = {
      status: isPaid,
      num_operation: numOperation,
      total_invoice: total,
      payment_method: _typeOperation,
    };

    const listDetails: Detail[] = details.map((detail: DetailInvoiceRow) => {
      return {
        product_id: detail.id,
        quantity: detail.quantity,
        unit_price: detail.price,
        total_line: detail.total,
      };
    });

    if (isPaid && numOperation.trim() === "") {
      toast.error("Error! si fue pagada debe meter el numero de operacion!", {
        duration: 5000,
      });

      return false;
    }

    const rsPurchase = await InvoiceRequest.saveNewPurshase({
      invoice: dataInvoice,
      details: listDetails,
    });

    if (rsPurchase.status === 201) {
      toast.success("Compra registrada con exito", { duration: 5000 });
      setDetails([]);
      setIsPaid(false);
      setQuantity("0");
      setTotal(0);
      setNumOperation("");
    }
  };

  useEffect(() => {
    setTotal(details.reduce((acc, row) => acc + row.total, 0));
  }, [details]);

  useEffect(() => {
    ProductRequest.searcherProducts(value)
      .then((res) => {
        if (res.status === 200) setShowAutoComplete(true);
        setListProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  return (
    <>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-12 md:col-span-4'>
          <Card>
            <form className='flex max-w-md flex-col gap-4'>
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='product' value='Buscar Producto' />
                </div>
                <TextInput
                  id='product'
                  value={searcher}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearcher(e.target.value)
                  }
                  name='product'
                  type='text'
                />
              </div>
              {showAutoComplete && (
                <AutoCompleteSearchProduct
                  onProductSelected={getProductSelected}
                  listProducts={listProducts!}
                />
              )}
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='quantity' value='Cantidad disponible' />
                </div>
                <TextInput
                  id='quantity_able'
                  name='quantity_able'
                  type='text'
                  value={quantityProduct}
                  disabled
                />
              </div>
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='price' value='Precio' />
                </div>
                <TextInput
                  id='price'
                  name='price'
                  type='text'
                  value={productSelected?.price}
                  disabled
                />
              </div>
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='quantity' value='Cantidad a Comprar' />
                </div>
                <TextInput
                  id='quantity'
                  value={quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(e.target.value)
                  }
                  name='quantity'
                  type='text'
                />
              </div>
              <Button
                onClick={addRowDetailInvoice}
                outline
                gradientDuoTone='purpleToBlue'
              >
                Agregar a la Compra!
              </Button>
              <hr />
              <hr />
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='type_operation' value='Tipo de Operacion' />
                </div>
                <Select
                  name='type_operation'
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTypeOperation(e.target.value)
                  }
                  id='type_operation'
                  defaultValue={"biopago"}
                >
                  <option value={"biopago"}>biopago</option>
                  <option value={"TDD"}>Tarjeta de Debito</option>
                  <option value={"Bs Efectvo"}>Bs Efectvo</option>
                  <option value={"$ efectivo"}>$ efectivo</option>
                  <option value={"TDC"}>Tarjeta de Credito</option>
                </Select>
              </div>
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='num_operation' value='Numero de Operacion' />
                </div>
                <TextInput
                  value={numOperation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNumOperation(e.target.value)
                  }
                  id='num_operation'
                  name='num_operation'
                  type='text'
                />
              </div>
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label htmlFor='total_invoice' value='Total' />
                </div>
                <TextInput
                  readOnly
                  value={total}
                  id='total_invoice'
                  name='total_invoice'
                  type='text'
                />
              </div>
              <ToggleSwitch
                checked={isPaid}
                label='Fue pagada?'
                onChange={setIsPaid}
              />
              <Button onClick={saveNewPurshase}>Registrar Compra!</Button>
            </form>
          </Card>
        </div>

        <div className='col-span-12 md:col-span-8'>
          <div className='overflow-x-auto'>
            <Card>
              <Table>
                <TableHead>
                  <TableHeadCell>Producto</TableHeadCell>
                  <TableHeadCell>Precio</TableHeadCell>
                  <TableHeadCell>Cantidad</TableHeadCell>
                  <TableHeadCell>Total</TableHeadCell>
                  <TableHeadCell>
                    <span className='sr-only'>Edit</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className='divide-y'>
                  {details.map((detail, index) => (
                    <TableRow
                      key={index}
                      className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    >
                      <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                        {detail.name}
                      </TableCell>
                      <TableCell>{detail.price}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{detail.total}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            removeitemDetails(detail.id);
                          }}
                          outline
                          gradientDuoTone='pinkToOrange'
                          pill
                        >
                          Quitar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <strong>Total a Pagar:</strong> {total}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormInvoice;
