import { useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import styles from "../styles/Login.module.css";
import React, { useState } from "react";
import Button from "../components/button";

const ForgotPassword: NextPage = () => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    console.log("A name was submitted: " + email);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C - Forgot Password"}</title>
        <meta name="description" content={"A&C - Forgot Password"} />
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
          <div className={styles.loginTitle}>Forgot Password</div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <div>
              <Button
                type="button"
                text="Reset Password"
                onClick={() => handleSubmit()}
                borderRadius={8}
              />
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default React.memo(ForgotPassword);
