import { Grid, Link } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AdminMenu from "../../components/layout/adminMenu";
import styles from "../../styles/Admin.module.css";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "../../components/button";
import { getUsers } from "../../api/user/getUsers";
import { useEffect, useState } from "react";
import { User } from "../../api/utils/types/user.type";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const columns = [
  {
    field: "id",
    headerName: "ID",
    sortable: false,
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <div>{params.value}</div>
        <Link className={styles.detail} href={`/admin/user/${params.value}`}>
          <RemoveRedEyeIcon fontSize="medium" />
        </Link>
      </>
    ),
  },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 350 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    // type: "number",
    width: 300,
  },
  {
    field: "history",
    headerName: "Orders",
    sortable: false,
    width: 300,
    valueGetter: (params: any) =>
      `${params[params.length - 1] ? params[params.length - 1].id : ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const AdminUsers: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C Trading"}</title>
        <meta name="description" content="A&C Trading Shop" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <main>
        <Grid container flexDirection={"row"}>
          <Grid item xs={2}>
            <AdminMenu />
          </Grid>
          <Grid item xs={10} padding={5}>
            <Grid container>
              <Grid item xs={10}>
                <div className={styles.title}>Users</div>
              </Grid>
              <Grid item xs={2} justifyContent={"flex-end"}>
                <Link href={"/admin/user/create"}>
                  <Button
                    text="Add User"
                    onClick={() => {}}
                    type="button"
                    borderRadius={5}
                  />
                </Link>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                sx={{ fontSize: 17 }}
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick={true}
                style={{ borderWidth: 5, borderRadius: 8 }}
              />
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default AdminUsers;
