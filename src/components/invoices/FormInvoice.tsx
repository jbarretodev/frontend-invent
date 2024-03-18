import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
  Card,
} from "flowbite-react";

const FormInvoice = () => {
  const [details, setDetails] = useState();
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
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
                <TextInput id="product" name="product" type="text" />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Cantidad" />
                </div>
                <TextInput id="quantity" name="quantity" type="text" />
              </div>
              <Button outline gradientDuoTone="purpleToBlue">
                Agregar a la Compra!
              </Button>
              <hr />
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="type_operation" value="Tipo de Operacion" />
                </div>
                <Select name="type_operation" id="type_operation">
                  <option value={"biopago"}>biopago</option>
                  <option value={"TDD"}>Tarjeta de Debito</option>
                  <option value={"Bs Efectvo"}>Bs Efectvo</option>
                  <option value={"$ efectivo"}>$ efectivo</option>
                  <option value={"TDC"}>Tarjeta de Credito</option>
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="num_operation" value="Numero de Operacion" />
                </div>
                <TextInput
                  id="num_operation"
                  name="num_operation"
                  type="text"
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="total" value="Total" />
                </div>
                <TextInput id="total" name="total" type="text" />
              </div>
              <ToggleSwitch
                checked={isPaid}
                label="Fue pagada?"
                onChange={setIsPaid}
              />
              <Button>Registrar Compra!</Button>
            </form>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="overflow-x-auto">
            <Card>
              <Table>
                <TableHead>
                  <TableHeadCell>Product name</TableHeadCell>
                  <TableHeadCell>Color</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Edit</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {'Apple MacBook Pro 17"'}
                    </TableCell>
                    <TableCell>Sliver</TableCell>
                    <TableCell>Laptop</TableCell>
                    <TableCell>$2999</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Microsoft Surface Pro
                    </TableCell>
                    <TableCell>White</TableCell>
                    <TableCell>Laptop PC</TableCell>
                    <TableCell>$1999</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Magic Mouse 2
                    </TableCell>
                    <TableCell>Black</TableCell>
                    <TableCell>Accessories</TableCell>
                    <TableCell>$99</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </a>
                    </TableCell>
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
