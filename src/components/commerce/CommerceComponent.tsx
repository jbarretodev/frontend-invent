//import React from 'react'

import React, { useEffect, useState } from "react";
import { CommerceCreate } from "../../@types";
import CommerceRequest from "../../api/CommerceRequest";
import { Card, Label, TextInput, Button, Textarea } from "flowbite-react";
import toast from "react-hot-toast";

const CommerceComponent = () => {
  const [commerce, setCommerce] = useState<CommerceCreate>({
    address: "",
    identification: "",
    name: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCommerce({ ...commerce, [name]: value });
  };

  useEffect(() => {
    CommerceRequest.getInfoCommerce().then((rs) =>
      setCommerce(rs as CommerceCreate)
    );
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    CommerceRequest.updateInfoCommerce(commerce)
      .then((__rs) => {
        setIsLoading(false);
        toast.success("Cambios guardado exitosamente!", { duration: 5000 });
      })
      .catch((__err) =>
        toast.error("Ha ocurrido un error! Por favor, intentelo luego!", {
          duration: 5000,
        })
      );
  };

  return (
    <>
      <div className="flex justify-center items-center h-full mb-10">
        <Card className="w-full md:max-w-xl flex flex-col gap-4 p-4">
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" value="Nombre del Commercio" />
              <TextInput
                value={commerce.name}
                name="name"
                onChange={handleInputChange}
                id="product"
                type="text"
                placeholder="Nombre del Commercio"
                shadow
              />
            </div>
            <div>
              <Label
                htmlFor="price"
                value="RIF o Identificación del Comercio"
              />
              <TextInput
                value={commerce.identification}
                name="identification"
                onChange={handleInputChange}
                id="identification"
                type="text"
                placeholder="RIF o Identificación del Comercio"
                shadow
              />
            </div>
            <div>
              <Label htmlFor="phone" value="Teléfono" />
              <TextInput
                id="phone"
                type="phone"
                name="phone"
                value={commerce.phone}
                onChange={handleInputChange}
                shadow
              />
            </div>
            <div className="max-w-lg">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Dirección" />
              </div>
              <Textarea
                id="address"
                value={commerce.address}
                name="address"
                placeholder="Dirección del Comercio"
                onChange={handleInputChange}
                required
                rows={5}
              />
            </div>
            <Button onClick={handleSubmit} isProcessing={isLoading}>
              Guardar Cambios
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CommerceComponent;
