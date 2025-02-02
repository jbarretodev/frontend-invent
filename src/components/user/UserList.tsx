import DataTable, { TableColumn } from "react-data-table-component";
import { User, UserRow } from "../../@types";
import { useEffect, useState } from "react";
import UserRequest from "../../api/User.ts";
import CustomCell from "../shared/CustomCell.tsx";
import { Button } from "flowbite-react";
type Props = {
  reloadFlag: boolean;
};

const UserList = ({ reloadFlag }: Props) => {
  const columns: TableColumn<UserRow>[] = [
    {
      name: "Nombre completo",
      selector: (row: UserRow) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: UserRow) => row.email,
      sortable: true,
    },
    {
      name: "Fecha de Creación",
      selector: (row: UserRow) => row.createdAt.split("T")[0],
      sortable: true,
    },
    {
      name: "Activado",
      selector: (row: UserRow) => (row.active ? "Sí" : "No"),
      sortable: true,
    },
    {
      name: "Acccion",
      selector: (row: UserRow) => row.id,
      cell: (__row: UserRow) => (
        <Button
          color="failure"
          onClick={() => {
            alert("Eliminar usuario");
            // UserRequest.deleteUser( row.id ).then( ( response ) => {
            //   console.log( response );
            // } );
          }}
        >
          Eliminar!
        </Button>
      ),
      //sortable: true,
    },
    {
      name: "Detalles",
      selector: (row: UserRow) => row.id,
      cell: (row: UserRow) => (
        <CustomCell message="Ver Usuario" route="/dashboard/user" id={row.id} />
      ),
      //sortable: true,
    },
  ];

  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    UserRequest.getUserList().then((userList: User[]) => {
      setUserList(userList);
    });
  }, []);

  useEffect(() => {
    UserRequest.getUserList().then((userList: User[]) => {
      setUserList(userList);
    });
  }, [reloadFlag]);

  return <DataTable columns={columns} data={userList} pagination />;
};

export default UserList;
