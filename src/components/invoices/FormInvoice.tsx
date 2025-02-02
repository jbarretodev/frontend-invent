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
  Label,
  Select,
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
import ClientRequest from "../../api/client";
import { Spinner } from "flowbite-react";
import IvaRequest from "../../api/iva";
import CommerceRequest from "../../api/CommerceRequest";

const FormInvoice = () => {
  const [details, setDetails] = useState<DetailInvoiceRow[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [listProducts, setListProducts] = useState<ListProducts>();
  const [searcher, setSearcher] = useState<string>("");
  const [value] = useDebounce(searcher, 500);
  const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<Product>();
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [total, setTotal] = useState<number>(0.0);
  const [quantity, setQuantity] = useState<number>(0);
  const [numOperation, setNumOperation] = useState<string>("");
  const [_typeOperation, setTypeOperation] = useState<string>("biopago");
  const [isByUnit, setIsByUnit] = useState<boolean>(true);
  const [identification, setIdentification] = useState<string>("");
  const [fullNameClient, setFullNameClient] = useState<string>("");
  const [identificationSearch] = useDebounce(identification, 1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableClient, setDisabledClient] = useState<boolean>(true);
  const [clientId, setClientId] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0.0);
  const [iva, setIva] = useState<number>(0.0);
  const [exempts, setExempts] = useState<number[]>([]);
  const [isLoadingPurchase, setIsLoadingPurchase] = useState<boolean>(false);
  const [dolarRate, setDolarRate] = useState<number>(0.0);

  const getProductSelected = (product: Product) => {
    if (product) {
      setIsByUnit(product.sell_by == "by_unit" ? true : false);
      setProductSelected(product);
      setQuantityProduct(product.quantity);
    }
  };

  const addRowDetailInvoice = () => {
    const newValue = quantity / 1000;

    if (!isByUnit) setQuantity(newValue);

    if (Number(quantity) === 0) {
      toast.error("Error! la cantidad debe ser mayor a 0!", {
        duration: 5000,
      });
      return;
    }

    let amountIvaCalculated: number = 0.0;

    if (productSelected) {
      let totalCalculated = !isByUnit
        ? Number(Number((productSelected.price * dolarRate) * newValue).toFixed(2))
        : Number(Number((productSelected.price * dolarRate) * quantity).toFixed(2));

      if (productSelected.exempt) {
        amountIvaCalculated = (iva * totalCalculated) / 100;
        setExempts([...exempts, amountIvaCalculated]);
      }

      const detail: DetailInvoiceRow = {
        id: productSelected.id,
        name: productSelected.name,
        price: productSelected.price,
        iva: amountIvaCalculated,
        quantity: !isByUnit ? newValue : quantity,
        total: totalCalculated,
      };

      setDetails([...details, detail]);
    }
  };

  const removeitemDetails = (id: number) => {
    setDetails(details.filter((row) => row.id !== id));
  };

  const saveNewPurshase = async () => {
    setIsLoadingPurchase( true );
    
    if (Number(total) === 0) {
      setIsLoadingPurchase(false);
      toast.error(
        "Error! Debe tener al menos un producto para efectuar la compra!",
        { duration: 5000 }
      );
      return;
    }

    const dataInvoice: Purchase = {
      status: isPaid,
      subtotal: subTotal,
      num_operation: numOperation,
      total_invoice: total + subTotal,
      payment_method: _typeOperation,
    };

    if (clientId > 0) {
      dataInvoice.client_id = clientId;
    } else {
      dataInvoice.full_name_client = fullNameClient;
      dataInvoice.identification = identification;
    }

    const listDetails: Detail[] = details.map((detail: DetailInvoiceRow) => {
      return {
        product_id: detail.id,
        quantity: detail.quantity,
        unit_price: detail.price,
        total_line: detail.total,
        iva: detail.iva,
      };
    });

    if (isPaid && numOperation.trim() === "") {
      toast.error(
        "Error! si fue pagada debe introducir el número de operación!",
        {
          duration: 5000,
        }
      );

      return false;
    }

    const rsPurchase = await InvoiceRequest.saveNewPurshase({
      invoice: dataInvoice,
      details: listDetails,
    });

    setIsLoadingPurchase(false);

    if (!rsPurchase) {
      toast.error("Ha ocurrido un error en el servidor!, intentelo luego", {
        duration: 6000,
      });
      return;
    }

    if (rsPurchase.status === 201) {
      toast.success("Compra registrada con éxito", { duration: 5000 });
      setDetails([]);
      setExempts([]);
      setSubTotal(0.0);
      setIsPaid(false);
      setQuantity(0);
      setTotal(0);
      setNumOperation("");
      setClientId(0);
      setFullNameClient("");
      setIdentification("");
    }
  };

  useEffect(() => {
    IvaRequest.getCurrentValueIva()
      .then((rs) => {
        setIva(rs?.value as number);
        //const iva = rs.data.value;
        //setSubTotal(total * iva / 100);
      })
      .catch((err) => {
        console.log(err);
      });

    CommerceRequest.getDolarRate()
      .then((rs) => {
        const dolarRate = rs?.dolarRate as number;
        setDolarRate((prevState) => (prevState = dolarRate));
      })
      .catch((_err) => {});
  }, []);

  useEffect(() => {
    setIsLoading(true);
    ClientRequest.getOneClient(identification)
      .then((__rs) => {
        setIsLoading(false);

        if (!__rs) {
          setDisabledClient(false);
          return;
        }

        setDisabledClient(true);
        setClientId(__rs.id);
        setFullNameClient(__rs.fullName);
      })
      .catch((__err) => {
        setIsLoading(false);
      });
  }, [identificationSearch]);

  useEffect(() => {
    setTotal(details.reduce((acc, row) => acc + row.total, 0));
    setSubTotal(details.reduce((acc, row) => acc + row.iva, 0));
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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <Card>
            <form className="flex max-w-md flex-col gap-4">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="product" value="Buscar Producto" />
                </div>
                <TextInput
                  id="product"
                  value={searcher}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearcher(e.target.value)
                  }
                  name="product"
                  type="text"
                />
              </div>
              {showAutoComplete && (
                <AutoCompleteSearchProduct
                  onProductSelected={getProductSelected}
                  listProducts={listProducts!}
                />
              )}
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Cantidad disponible" />
                </div>
                <TextInput
                  id="quantity_able"
                  name="quantity_able"
                  type="text"
                  value={quantityProduct}
                  disabled
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Precio" />
                </div>
                <TextInput
                  id="price"
                  name="price"
                  type="text"
                  value={productSelected?.price}
                  disabled
                />
              </div>
              {productSelected?.sell_by === "by_unit" ? (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor="quantity" value="Cantidad a Comprar" />
                  </div>
                  <TextInput
                    id="quantity"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuantity(Number(e.target.value))
                    }
                    name="quantity"
                    type="text"
                  />
                </div>
              ) : (
                <div className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor="quantity" value="Cantidad en Gramos" />
                  </div>
                  <TextInput
                    id="quantity"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setQuantity(Number(e.target.value));
                    }}
                    name="quantity"
                    type="text"
                  />
                </div>
              )}
              <Button
                onClick={addRowDetailInvoice}
                outline
                gradientDuoTone="purpleToBlue"
              >
                Agregar a la Compra!
              </Button>
              <hr />
              <hr />
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="product" value="Identificación del Cliente" />
                </div>
                <TextInput
                  id="identification"
                  value={identification}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.trim() === "") {
                      setDisabledClient(true);
                      setFullNameClient("");
                    }

                    setIdentification(e.target.value);
                  }}
                  name="identification"
                  type="text"
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="fullNameClient" value="Nombre y Apellido" />
                </div>
                <TextInput
                  id="fullNameClient"
                  value={fullNameClient}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullNameClient(e.target.value)
                  }
                  disabled={disableClient}
                  name="fullNameClient"
                  type="text"
                />
                {isLoading && (
                  <Spinner aria-label="Large spinner example" size="lg" />
                )}
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="type_operation" value="Tipo de Operación" />
                </div>
                <Select
                  name="type_operation"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTypeOperation(e.target.value)
                  }
                  id="type_operation"
                  defaultValue={"biopago"}
                >
                  <option value={"biopago"}>biopago</option>
                  <option value={"TDD"}>Tarjeta de Debito</option>
                  <option value={"Bs Efectvo"}>Bs Efectvo</option>
                  <option value={"$ efectivo"}>$ efectivo</option>
                  <option value={"TDC"}>Tarjeta de Credito</option>
                  <option value={"NINGUNO"}>NINGUNO</option>
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="num_operation" value="Numero de Operación" />
                </div>
                <TextInput
                  value={numOperation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNumOperation(e.target.value)
                  }
                  id="num_operation"
                  name="num_operation"
                  type="text"
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="total_invoice" value="Total" />
                </div>
                <TextInput
                  readOnly
                  value={total + subTotal}
                  id="total_invoice"
                  name="total_invoice"
                  type="text"
                />
              </div>
              <ToggleSwitch
                checked={isPaid}
                label="Fue pagada?"
                onChange={setIsPaid}
              />
              <Button
                isProcessing={isLoadingPurchase}
                onClick={saveNewPurshase}
              >
                Registrar Compra!
              </Button>
            </form>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="overflow-x-auto">
            <Card>
              <Table>
                <TableHead>
                  <TableHeadCell>Producto</TableHeadCell>
                  <TableHeadCell>Precio</TableHeadCell>
                  <TableHeadCell>Cantidad</TableHeadCell>
                  <TableHeadCell>IVA</TableHeadCell>
                  <TableHeadCell>Total</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Edit</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {details.map((detail, index) => (
                    <TableRow
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {detail.name}
                      </TableCell>
                      <TableCell>{detail.price}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{detail.iva}</TableCell>
                      <TableCell>{detail.total}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            removeitemDetails(detail.id);
                          }}
                          outline
                          gradientDuoTone="pinkToOrange"
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
                      <strong>SubTotal:</strong> {Number(subTotal).toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <strong>Total Neto:</strong> {Number(total).toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <strong>Total a Pagar:</strong>{" "}
                      {Number(total + subTotal).toFixed(2)}
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
