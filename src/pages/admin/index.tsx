import { Grid, Link, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/button";
import styles from "../../styles/Admin.module.css";

const Admin: NextPage = () => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

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
    console.log("A name was submitted: " + loginFormState.password);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C Admin"}</title>
        <meta name="description" content="A&C Trading Shop" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <main>
        <div
          style={{
            backgroundColor: "#C4A484",
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={styles.loginSection}
            style={{
              width: isSmall ? "90%" : isTablet ? "70%" : "40%",
              margin: isSmall ? "5% auto" : "3rem",
            }}
          >
            <div className={styles.loginTitle}>Admin Login</div>
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
              <div>
                <Button
                  type="button"
                  text="Login"
                  onClick={() => handleSubmit()}
                  borderRadius={8}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
