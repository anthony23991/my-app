import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import {
  Product,
  ProductCreateInput,
} from "../../../api/utils/types/product.type";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import storage from "../../../../firebaseConfig";
import { getCategories } from "../../../api/category/getCategories";
import { Category } from "../../../api/utils/types/category.type";
import createProduct from "../../../api/product/create";

const initialForm: ProductCreateInput = {
  brand: "",
  name: "",
  img: "",
  imgRef: "",
  price: 0,
  description: "",
};

const CreateProduct: NextPage = () => {
  const [product, setProduct] = useState<ProductCreateInput>(initialForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUpload, setImageUpload] = useState<File>();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const router = useRouter();
  const [displayImg, setDisplayImg] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(product);
    event.preventDefault();
    if (product.brand.length == 0) {
      toast.error("Brand is required");
    }
    if (product.name.length == 0) {
      toast.error("Name is required");
    }
    if (product.price < 1) {
      toast.error("Price is required");
    }
    if (imageUpload == null) {
      alert("Please choose an image!");
    } else {
      console.log(imageUpload.name);
      const imageRef = ref(
        storage,
        `images/products/${product.name}-${product.brand}-${imageUpload.name}`
      );
      uploadBytes(imageRef, imageUpload)
        .then((res) => {
          toast.success("image uploaded");
          console.log("uplowwwww", res);
          getDownloadURL(imageRef)
            .then((url) => {
              createProduct({
                ...product,
                img: url,
                imgRef: `images/products/${product.name}-${product.brand}-${imageUpload.name}`,
              })
                .then((res) => {
                  if (res.success) {
                    toast.success("review created");
                    router.push("/admin/products");
                  } else {
                    toast.error("review not created");
                    deleteObject(imageRef).then((res) => {
                      console.log("image deleted");
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("review creation failed");
                  deleteObject(imageRef).then((res) => {
                    console.log("image deleted");
                  });
                  return;
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // isNaN(+maybeNumber)

  useEffect(() => {
    getCategories();
  }, []);

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
              <div className={styles.title}>Add Product</div>
              <form onSubmit={handleSubmit}>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Name :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
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
                      onChange={(event) => {
                        setProduct({ ...product, brand: event.target.value });
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
                      onChange={(event) => {
                        setProduct({
                          ...product,
                          description: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Category :</div>
                  </Grid>
                  <Grid item xs={2.5}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCategory}
                        label="Category"
                        onChange={(category) => {
                          console.log(category);
                          // setSelectedCategory(category.target.value);
                        }}
                      >
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            style={{ marginBottom: 10, marginTop: 100 }}
                          >
                            <MenuItem value={category.id}>
                              {category.name}
                            </MenuItem>
                          </div>
                        ))}
                      </Select>
                    </FormControl>
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
                      onChange={(event) => {
                        if (event.target.files != null) {
                          setImageUpload(event.target.files[0]);
                          setDisplayImg(
                            URL.createObjectURL(event.target.files[0])
                          );
                        }
                      }}
                    />
                    {displayImg.length > 0 && (
                      <Image
                        src={displayImg}
                        alt="d"
                        width={200}
                        height={200}
                      />
                    )}
                  </Grid>
                </Grid>
                <input
                  className={[styles.adminInput, styles.submitInput].join(" ")}
                  type="submit"
                  value="Submit"
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default CreateProduct;
