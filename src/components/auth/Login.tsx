import { Card } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import AuthService from "../../api/auth";
import { ResponseLoginUser, ResourceNotFound } from "../../@types";
import toast from "react-hot-toast";
import React from "react";
//import { useHotkeys } from "react-hotkeys-hook";

interface ChildProps {
  redirectToDashboard: () => void;
}

const Login: React.FC<ChildProps> = ({ redirectToDashboard }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const makeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("Error! Email vacio");
      return;
    }

    if (password.trim() === "") {
      toast.error("Error! password vacio");
      return;
    }

    const rsLogin: ResponseLoginUser | ResourceNotFound =
      await AuthService.login(email, password);

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
      <Card className='max-w-md'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Bienvenido a Invent
        </h5>
        <form
          className='flex max-w-md flex-col gap-4'
          onSubmit={(e) => {
            makeLogin(e);
          }}
        >
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='email' value='Ingrese su Correo' />
            </div>
            <TextInput
              id='email1'
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='xxx@yyy.com'
              required
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='password' value='Ingrese tu Clave' />
            </div>
            <TextInput
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              required
            />
          </div>

          <Button type='submit' id='button-login'>
            Iniciar Sesion!
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Login;
