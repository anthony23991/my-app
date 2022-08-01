import { Grid, Link } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AdminMenu from "../../components/layout/adminMenu";
import styles from "../../styles/Admin.module.css";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getOrders } from "../../api/order/getOrders";
import { useEffect, useState } from "react";
import { Order } from "../../api/utils/types/order.type";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <div>{params.value}</div>
        <Link className={styles.detail} href={`/admin/order/${params.value}`}>
          <RemoveRedEyeIcon fontSize="medium" />
        </Link>
      </>
    ),
  },
  {
    field: "user",
    headerName: "User Name",
    width: 200,
    valueGetter: (params: any) =>
      `${params.value ? params.value.name : "no category"}`,
  },
  { field: "date", headerName: "Order Date", width: 200 },
  {
    field: "total",
    headerName: "Total",
    width: 150,
  },
  {
    field: "delivered",
    headerName: "Delivered",
    width: 150,
  },
  {
    field: "items",
    headerName: "Cart Size",
    width: 250,
    valueGetter: (params: any) =>
      `${params.value ? `${params.value.length} Items` : "no cart"}`,
  },
];

const AdminOrders: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders()
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setOrders(res.data);
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
            <div className={styles.title}>Orders</div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={orders}
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

export default AdminOrders;
