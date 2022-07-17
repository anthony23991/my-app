import { useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import styles from "../styles/Login.module.css";
import React, { useState } from "react";
import Button from "../components/button";

const NewPassword: NextPage = () => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      console.log("New password set: " + password);
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C - New Password"}</title>
        <meta name="description" content={"A&C - New Password"} />
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
          <div className={styles.loginTitle}>New Password</div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.loginInput}
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              className={styles.loginInput}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <div>
              <Button
                type="button"
                text="Set new Password"
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

export default React.memo(NewPassword);
