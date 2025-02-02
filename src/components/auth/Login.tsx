import { Card } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import AuthService from "../../api/auth";
import { ResponseLoginUser, ResourceNotFound } from "../../@types";
import toast from "react-hot-toast";
import React from "react";

interface ChildProps {
  redirectToDashboard: () => void;
}

const Login: React.FC<ChildProps> = ({ redirectToDashboard }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const makeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("Error! Email vacío");
      return;
    }

    if (password.trim() === "") {
      toast.error("Error! password vacío");
      return;
    }

    const rsLogin: ResponseLoginUser | ResourceNotFound =
      await AuthService.login(email, password);

    console.log(rsLogin);

    setIsProcessing(false);

    if ("message" in rsLogin) {
      toast.error("Error! Credenciales Incorrectas");
    } else {
      const rs = rsLogin as ResponseLoginUser;
      localStorage.setItem("token", rs.token);
      localStorage.setItem("user", JSON.stringify(rs.user));
      localStorage.setItem("expireAt", rs.expireAt);

      redirectToDashboard();
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg p-6">
        <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Bienvenido a Invent
        </h5>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            makeLogin(e);
          }}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Ingrese su Correo" />
            </div>
            <TextInput
              id="email1"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Ingrese tu Clave" />
            </div>
            <TextInput
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              required
            />
          </div>

          <Button isProcessing={isProcessing} type="submit" id="button-login">
            Iniciar Sesion!
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Login;
