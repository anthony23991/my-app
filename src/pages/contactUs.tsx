import { Grid, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ContactForm } from "../api/types/contactForm.type";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import styles from "../styles/ContactUs.module.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Button from "../components/button";
import { useRouter } from "next/router";

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

const ContactUs: NextPage = () => {
  const isMobile = useMediaQuery("(max-width: 770px)");
  const isTablet = useMediaQuery("(max-width: 1000px)");
  const router = useRouter();
  const [contactFormState, setContactFormState] =
    useState<ContactForm>(initialForm);

  const api = "AIzaSyB6BBkBwwvlW58EW_bMYytoAeE2BJLx8m0";
  const mapID = "333582a4c2fc438";

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyB6BBkBwwvlW58EW_bMYytoAeE2BJLx8m0",
  // });

  const handleChange = (value: string, type: string) => {
    switch (type) {
      case "fullName":
        setContactFormState((prev) => ({
          ...prev,
          fullName: value,
        }));
        break;
      case "phoneNumber":
        setContactFormState((prev) => ({
          ...prev,
          phoneNumber: value,
        }));
        break;
      case "email":
        setContactFormState((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      case "message":
        setContactFormState((prev) => ({
          ...prev,
          message: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    alert("A name was submitted: " + contactFormState);
  };

  const center = {
    lat: 33.936002,
    lng: 35.588901,
  };
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback() {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{"A&C - Contact Us"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.pathname === "/" ? <></> : <Header />}

      <main className={styles.main}>
        <div className={styles.contactTitle}>Contact Us </div>
        <Grid container justifyContent={isTablet ? "flex-start" : "flex-end"}>
          <Grid item xs={isMobile ? 12 : 4}>
            <form onSubmit={handleSubmit}>
              <input
                className={styles.contactInput}
                type="text"
                placeholder="Full Name"
                value={contactFormState?.fullName}
                onChange={(event) => {
                  handleChange(event.target.value, "fullName");
                }}
              />
              <input
                className={styles.contactInput}
                type="text"
                placeholder="Phone Number"
                value={contactFormState?.phoneNumber}
                onChange={(event) => {
                  handleChange(event.target.value, "phoneNumber");
                }}
              />
              <input
                className={styles.contactInput}
                type="text"
                placeholder="Email"
                value={contactFormState?.email}
                onChange={(event) => {
                  handleChange(event.target.value, "email");
                }}
              />
              <input
                className={[styles.contactInput, styles.messageInput].join(" ")}
                type="text"
                placeholder="Message"
                value={contactFormState?.message}
                onChange={(event) => {
                  handleChange(event.target.value, "message");
                }}
              />
              {/* <input
                type="submit"
                value="SEND NOW"
                onSubmit={handleSubmit}
                className={styles.submitInput}
              /> */}
              <Button type="submit" text="SEND NOW" onClick={handleSubmit} />
            </form>
          </Grid>
          <Grid item xs={isMobile ? 12 : 6}>
            {/* {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <></>
              </GoogleMap>
            )} */}
          </Grid>
        </Grid>
      </main>

      {router.pathname === "/" ? <></> : <Footer />}
    </div>
  );
};

export default React.memo(ContactUs);
