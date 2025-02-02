import { Button, Label, TextInput, Card, Select } from "flowbite-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Roles, UserCreateInter } from "../../@types";
import RoleRequest from "../../api/RoleRequest";
import UserRequest from "../../api/User";

interface CreateUserProps {
  onNewUserCreated: () => void;
}

export const UserCreate = ({ onNewUserCreated }: CreateUserProps) => {
  const [roles, setRoles] = useState<Roles>([]);
  const [user, setUser] = useState<UserCreateInter>({
    fullName: "",
    email: "",
    password: "",
    role_id: 1,
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const cleanForm = () => {
    setUser({
      fullName: "",
      email: "",
      password: "",
      role_id: 1,
    });
  };

  const createNewUser = async (): Promise<void> => {
    try {
      setIsProcessing(true);
      const newUser = await UserRequest.createUser(user);

      if (newUser) {
        toast.success("Usuario creado correctamente");
      } else {
        toast.error("Error al crear el usuario");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el usuario");
    } finally {
      setIsProcessing(false);
      onNewUserCreated();
      cleanForm();
    }
  };

  useEffect(() => {
    RoleRequest.getRoles().then((data: Roles) => {
      setRoles(data);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-full mb-10">
        <Card className="w-full md:max-w-xl flex flex-col gap-4 p-4">
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="fullName" value="Nombre Completo" />
              <TextInput
                value={user.fullName}
                name="fullName"
                onChange={handleInputChange}
                id="fullName"
                type="text"
                placeholder="Nombre Completo"
                shadow
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                value={user.email}
                name="email"
                onChange={handleInputChange}
                id="email"
                type="text"
                placeholder="xxxxx@invent.com"
                shadow
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                shadow
              />
            </div>
            <div className="max-w-xl">
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <Select id="role" name="role_id" onChange={handleInputChange}>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </div>
            <Button isProcessing={isProcessing} onClick={createNewUser}>
              Registrar Usuario
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
