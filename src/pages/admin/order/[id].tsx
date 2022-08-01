import { Grid, Link } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import { Order } from "../../../api/utils/types/order.type";
import { User } from "../../../api/utils/types/user.type";
import { getOrderById } from "../../../api/order/getOrderById";
import { deleteOrderById } from "../../../api/order/deleteOrder";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const initialForm: Order = {
  id: 0,
  user: {} as User,
  date: new Date(Date.now()),
  items: [],
  total: 0,
  delivered: false,
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "product",
    headerName: "Product Name",
    width: 300,
    valueGetter: (params: any) =>
      `${params.value ? params.value.name : "no name"}`,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <div>{params.value}</div>
        <Link className={styles.detail} href={`/admin/product/${params.value}`}>
          <RemoveRedEyeIcon fontSize="medium" />
        </Link>
      </>
    ),
  },
  { field: "quantity", headerName: "Quantity", width: 100 },
];

const OrderDetail: NextPage = () => {
  const [order, setOrder] = useState<Order>(initialForm);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const deleteHandler = (id: number) => {
    deleteOrderById(id)
      .then((res) => {
        if (res.data) {
          toast.success("Order deleted successfully");
          router.push("/admin/orders");
        } else {
          toast.error("User deletion failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const orderId = id as string;
    getOrderById(+orderId)
      .then((res) => {
        if (res.data) {
          setOrder(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // isNaN(+maybeNumber)

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
            <Grid className={styles.cardContainer}>
              <div className={styles.title}>Order N: {order.id} </div>
              <form>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>User name :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={order.user.name}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>User ID :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={order.user.id}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div
                      className={styles.label}
                      style={{ paddingTop: "0rem" }}
                    >
                      Date :
                    </div>
                  </Grid>
                  <Grid item>
                    <input
                      type={"file"}
                      value={order.date.toString()}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Total Price :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={order.total}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Cart :</div>
                  </Grid>
                  <Grid item>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={order.items}
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
              </form>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default OrderDetail;
