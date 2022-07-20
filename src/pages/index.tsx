import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Product } from "../api/utils/types/product.type";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import OffersCard from "../components/offersCard";
import ProductsSlider from "../components/productsSlider";
import { useUserContext } from "../context/userContext";
import styles from "../styles/Home.module.css";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
import Products from "./products";
import Testimonial from "./testimonial";

const Home: NextPage = () => {
  const testProducts: Product[] = [
    {
      brand: "Kinder",
      name: "Maxi",
      img: "/products/maxi.png",
      id: 1,
      price: 1.9,
      description: "",
    },
    {
      brand: "chocolate",
      name: "M & M",
      img: "/products/m&m.png",
      id: 2,
      price: 2.9,
      description: "",
    },
    {
      brand: "choc",
      name: "Maltesers",
      img: "/products/maltesers.png",
      id: 3,
      price: 3.9,
      description: "",
    },
  ];

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
        <Header />
        <ProductsSlider products={testProducts} />
        <AboutUs />
        <Products />
        <OffersCard img="/products/skittles.png" discount={5} />
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
