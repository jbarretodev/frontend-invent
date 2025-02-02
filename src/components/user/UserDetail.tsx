import { Role, User, UserUpdate } from "../../@types";
import { Button, Label, TextInput, Card, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import UserRequest from "../../api/User";
import RoleRequest from "../../api/RoleRequest";
import toast from "react-hot-toast";

interface UserDetailProps {
  id: number;
}

const UserDetail = ({ id }: UserDetailProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    UserRequest.getUser(Number(id)).then((data) => {
      if (data) setUser(data);
    });

    RoleRequest.getRoles().then((data) => {
      setRoles(data);
    });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (user) setUser({ ...user, [name]: value });
  };

  const handlerUpdateUser = async (user: User) => {
    setIsProcessing(true);
    UserRequest.updateUser({
      id: id,
      fullName: user.fullName,
      email: user.email,
      role_id: Number(user.roleId),
    })
      .then((data) => {
        if (data)
          toast.success("Usuario actualizado correctamente", {
            duration: 5000,
          });
        else {
          toast.error("Error al actualizar el usuario", { duration: 5000 });
        }
      })
      .catch((__error) => {
        toast.error("Error al actualizar el usuario", { duration: 5000 });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center h-full mb-10">
        <Card className="w-full md:max-w-xl flex flex-col gap-4 p-4">
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="fullName" value="Nombre Completo" />
              <TextInput
                defaultValue={user?.fullName}
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
                readOnly
                defaultValue={user?.email}
                name="email"
                onChange={handleInputChange}
                id="email"
                type="text"
                placeholder="xxxxx@invent.com"
                shadow
              />
            </div>
            <div className="max-w-xl">
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <Select
                value={user?.roleId}
                id="role"
                name="roleId"
                onChange={handleInputChange}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              isProcessing={isProcessing}
              onClick={() => handlerUpdateUser(user as User)}
            >
              Registrar Usuario
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default UserDetail;
