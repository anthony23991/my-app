import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import { Order } from "../../../api/utils/types/order.type";
import { User } from "../../../api/utils/types/user.type";
import { getOrderById } from "../../../api/order/getOrderById";

const initialForm: Order = {
  id: 0,
  user: {} as User,
  date: new Date(Date.now()),
  items: [],
  total: 0,
};

const OrderDetail: NextPage = () => {
  const [order, setOrder] = useState<Order>(initialForm);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(order);
    event.preventDefault();
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
              <form onSubmit={handleSubmit}>
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
                {/* Put table for items */}
                <input
                  className={[styles.adminInput, styles.submitInput].join(" ")}
                  type="submit"
                  value="Save"
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default OrderDetail;
