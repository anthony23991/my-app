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

const CreateAccount: NextPage = () => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isMobile = useMediaQuery("(max-width: 650px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");
  const { userState } = useUserContext();

  const [createFormState, setcreateFormState] = useState<{
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }>({ name: "", phoneNumber: "", email: "", password: "" });

  const handleChange = (value: string, type: string) => {
    switch (type) {
      case "email":
        setcreateFormState((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case "name":
        setcreateFormState((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case "phoneNumber":
        setcreateFormState((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case "password":
        setcreateFormState((prev) => ({
          ...prev,
          password: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    console.log("A name was submitted: " + createFormState.password);
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
          <div className={styles.loginTitle}>Create an Account</div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Name"
              value={createFormState?.name}
              onChange={(event) => {
                handleChange(event.target.value, "name");
              }}
            />
            <input
              className={styles.loginInput}
              type="text"
              placeholder="phoneNumber"
              value={createFormState?.phoneNumber}
              onChange={(event) => {
                handleChange(event.target.value, "phoneNumber");
              }}
            />
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Email"
              value={createFormState?.email}
              onChange={(event) => {
                handleChange(event.target.value, "email");
              }}
            />
            <input
              className={styles.loginInput}
              type="password"
              placeholder="Password"
              value={createFormState?.password}
              onChange={(event) => {
                handleChange(event.target.value, "password");
              }}
            />
            <div>
              <Button
                type="button"
                text="Create Account"
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

export default React.memo(CreateAccount);
