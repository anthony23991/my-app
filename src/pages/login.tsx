import { useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { ContactForm } from "../api/utils/types/contactForm.type";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import styles from "../styles/Login.module.css";
import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import Button from "../components/button";
import Link from "next/link";
import createProduct from "../api/product/create";
import { Product } from "../api/utils/types/product.type";
import { getProducts } from "../api/product/getProducts";

const Login: NextPage = () => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");
  const { userState } = useUserContext();

  const [loginFormState, setLoginFormState] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleChange = (value: string, type: string) => {
    switch (type) {
      case "email":
        setLoginFormState((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case "password":
        setLoginFormState((prev) => ({
          ...prev,
          password: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    console.log(
      "A name was submitted: " +
        loginFormState.email +
        " " +
        loginFormState.password
    );
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C - Login"}</title>
        <meta name="description" content={"A&C - Login"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <div
          className={styles.loginSection}
          style={{
            width: isSmall ? "90%" : isTablet ? "70%" : "40%",
            margin: isSmall ? "5% auto" : "3rem",
          }}
        >
          <div className={styles.loginTitle}>Login</div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Email"
              value={loginFormState?.email}
              onChange={(event) => {
                handleChange(event.target.value, "email");
              }}
            />
            <input
              className={styles.loginInput}
              type="password"
              placeholder="Password"
              value={loginFormState?.password}
              onChange={(event) => {
                handleChange(event.target.value, "password");
              }}
            />
            <div style={{ textAlign: "left" }}>
              <Link href="/forgotPassword">
                <div className={styles.forgotText}>Forgot Password ?</div>
              </Link>
            </div>
            <div>
              <Button
                type="button"
                text="Login"
                onClick={() => handleSubmit()}
                borderRadius={8}
              />
            </div>
            <div
              style={{
                textAlign: isMobile ? "center" : "left",
                flexDirection: isMobile ? "column" : "row",
                display: "flex",
                columnGap: 20,
                marginTop: 30,
              }}
            >
              <div className={styles.createText}>
                {`Dont have an account ?`}
              </div>
              <div>
                <Link href="/createAccount">
                  <div className={styles.createLink}>Create an account</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default React.memo(Login);
