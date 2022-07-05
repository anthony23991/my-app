import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Product } from "../../types";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import OffersCard from "../components/offersCard";
import ProductsSlider from "../components/productsSlider";
import styles from "../styles/Home.module.css";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
import Products from "./products";
import Testimonial from "./testimonial";

const Home: NextPage = () => {
  const testProducts: Product[] = [
    {
      brand: "Kitkat",
      name: "Crunchy",
      img: "",
    },
    {
      brand: "Kinder",
      name: "Delice",
      img: "",
    },
    {
      brand: "Cake",
      name: "Caramel",
      img: "",
    },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <main>
        <Header />
        <ProductsSlider products={testProducts} />
        <AboutUs />
        <Products />
        <OffersCard img="/about-img.png" discount={5} />
        <Testimonial />
        <ContactUs />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
