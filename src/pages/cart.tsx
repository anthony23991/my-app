import { Grid, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ContactForm } from "../api/utils/types/contactForm.type";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import styles from "../styles/Cart.module.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Button from "../components/button";
import { useRouter } from "next/router";
import { useUserContext } from "../context/userContext";
import ProductRow from "../components/CartRow";
import CartRow from "../components/CartRow";

const initialForm: ContactForm = {
  email: "",
  fullName: "",
  message: "",
  phoneNumber: "",
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Cart: NextPage = () => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1000px)");
  const { userState } = useUserContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C - My Cart"}</title>
        <meta name="description" content={"A&C - My Cart"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className={styles.contactTitle}>My Cart</div>
        <Grid
          container
          justifyContent={isTablet ? "flex-start" : "flex-end"}
          flexDirection={isTablet ? "column" : "row"}
          paddingLeft={isSmall ? "3%" : "10%"}
          paddingRight={isSmall ? "3%" : "0"}
          marginBottom={3}
          width={"100%"}
        >
          <Grid
            item
            container
            xs={isTablet ? 12 : 8}
            paddingRight={2}
            // marginRight={isTablet ? "10%" : "0%"}
          >
            <Grid
              item
              container
              flexDirection={"row"}
              className={styles.cartHeader}
              borderBottom={"1px solid darkgrey"}
              paddingBottom={3}
            >
              {!isSmall && (
                <>
                  <Grid item xs={isMobile ? 3 : 5}>
                    Product
                  </Grid>
                  <Grid item xs={2}>
                    Price
                  </Grid>
                  <Grid item xs={isMobile ? 4 : 2}>
                    Quantity
                  </Grid>
                  <Grid item xs={2}>
                    Total
                  </Grid>
                  <Grid item xs={1}></Grid>
                </>
              )}
            </Grid>
            {/* {userState && userState.cart.map((item) => <CartRow key={item.id} />)} */}
            <CartRow
              onDelete={(id) => {}}
              onQuantityChange={(id, quantity) => {}}
            />
            <CartRow
              onDelete={(id) => {}}
              onQuantityChange={(id, quantity) => {}}
            />
            <CartRow
              onDelete={(id) => {}}
              onQuantityChange={(id, quantity) => {}}
            />
          </Grid>
          <Grid
            item
            container
            xs={isTablet ? 12 : 4}
            className={styles.totalSection}
          >
            <div className={styles.cartTotal}>
              <div className={styles.totalTitle}>Cart Total</div>
              <div>25.67 $</div>
              <div className={styles.noticeText}>
                When the order is received, you will be contacted for
                confirmation
              </div>
              <div>
                <Button onClick={() => {}} text={"Order Now"} type="button" />
              </div>
            </div>
          </Grid>
        </Grid>
      </main>

      <Footer />
    </div>
  );
};

export default React.memo(Cart);
