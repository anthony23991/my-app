import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import { Product } from "../../../api/utils/types/product.type";
import { Category } from "../../../api/utils/types/category.type";
import { getProductById } from "../../../api/product/getProductById";
import { collection } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import storage from "../../../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const initialForm: Product = {
  id: 0,
  name: "",
  brand: "",
  description: "",
  price: 0,
  category: undefined,
  img: "",
  imgRef: "",
};

const ProductDetail: NextPage = () => {
  const [product, setProduct] = useState<Product>(initialForm);
  const [imageUpload, setImageUpload] = useState<File>();

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageUpload == null) {
      alert("Please choose a file first!");
    } else {
      const imageRef = ref(storage, `images/products/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload)
        .then((res) => {
          toast.success("image uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const productId = id as string;
    getProductById(+productId)
      .then((res) => {
        if (res.data) {
          setProduct(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // isNaN(+maybeNumber)

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
        <Grid container flexDirection={"row"}>
          <Grid item xs={2}>
            <AdminMenu />
          </Grid>
          <Grid item xs={10} padding={5}>
            <Grid className={styles.cardContainer}>
              <div className={styles.title}>Product N: {product.id} </div>
              <form onSubmit={handleSubmit}>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Name :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={product.name}
                      onChange={(event) => {
                        setProduct({ ...product, name: event.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Brand :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={product.brand}
                      onChange={(event) => {
                        setProduct({ ...product, brand: event.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div
                      className={styles.label}
                      style={{ paddingTop: "0rem" }}
                    >
                      Image :
                    </div>
                  </Grid>
                  <Grid item>
                    <input
                      type={"file"}
                      accept="image/*"
                      value={product.img}
                      onChange={(event) => {
                        if (event.target.files != null) {
                          setImageUpload(event.target.files[0]);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Price :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={product.price}
                      onChange={(event) => {
                        setProduct({
                          ...product,
                          price: +event.target.value,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Description :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={product.description}
                      onChange={(event) => {
                        setProduct({
                          ...product,
                          description: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                  {/* Put category selector */}
                </Grid>
                <input
                  className={[styles.adminInput, styles.submitInput].join(" ")}
                  type="submit"
                  value="Save"
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default ProductDetail;
