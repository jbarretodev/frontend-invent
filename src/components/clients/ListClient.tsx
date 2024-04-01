import { useEffect, useState } from "react";
import ClientRequest from "../../api/client";
import type { ListClient, ListClientTable } from "../../@types";
import { getFieldsTableClient } from "../../utils.ts";
import DataTable, { TableColumn } from "react-data-table-component";

interface ClientRow {
  fullName: string;
  identification: string;
  phone?: string;
  createdAt: string;
}

const ListClient = () => {
  const [listClients, setListClients] = useState<ListClient>([]);
  const [listClientTable, setListClientTable] = useState<ListClientTable>([]);

  const columns: TableColumn<ClientRow>[] = [
    {
      name: "Nombre Completo",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Identificacion",
      selector: (row) => row.identification,
      sortable: true,
    },
    {
      name: "Telefono",
      selector: (row) => row.phone || "NO TIENE",
      sortable: true,
    },
    {
      name: "Fecha Creacion",
      selector: (row) => row.createdAt.split("T")[0],
      sortable: true,
    },
  ];

  useEffect(() => {
    ClientRequest.getAllClient()
      .then((rs) => {
        if (rs) {
          setListClients(rs);
        } else setListClients([]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const rowsTbl = getFieldsTableClient(listClients);
    setListClientTable(rowsTbl);
  }, [listClients]);
  return (
    <>
      <DataTable
        title="Listado de Clientes"
        columns={columns}
        data={listClientTable}
        pagination={true}
      />
    </>
  );
};

export default ListClient;
