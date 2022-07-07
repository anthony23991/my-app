import { Grid, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { PageProp } from "../../types";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import OffersCard from "../components/offersCard";
import styles from "../styles/AboutUs.module.css";

const AboutUs: NextPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 770px)");
  const isSmall = useMediaQuery("(max-width: 500px)");
  return (
    <div>
      <Head>
        <title>{"A&C - About Us"}</title>
        <meta name="description" content={"A&C - About Us"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.pathname === "/" ? <></> : <Header />}

      <main
        className={styles.main}
        style={{ padding: router.pathname === "/" ? "0rem 0" : "4rem 0" }}
      >
        <Grid container flexDirection={isMobile ? "column" : "row"}>
          <Grid
            item
            xs={isMobile ? 12 : 6}
            flexBasis={0.5}
            paddingRight={isMobile ? "2%" : 0}
            paddingLeft={isMobile ? "2%" : "10%"}
            justifyContent={"center"}
            textAlign={isMobile ? "center" : "left"}
          >
            <div className={[styles.italyFont, styles.aboutTitle].join(" ")}>
              About Our Company
            </div>
            <div className={styles.aboutText}>
              Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making
              it look like readable English. Many desktop publishing packages
              and web pagend web page editors now use Lorem Ipsum as their
              default model text,
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            padding={5}
            paddingLeft={isSmall ? "5%" : isMobile ? "30%" : 0}
            justifyContent={"center"}
          >
            <Image
              src="/about-img.png"
              alt="logo"
              layout={isMobile ? "fixed" : "responsive"}
              height={150}
              width={300}
            />
          </Grid>
        </Grid>
      </main>

      {router.pathname === "/" ? <></> : <Footer />}
    </div>
  );
};

export default AboutUs;
