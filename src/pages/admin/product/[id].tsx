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
import storage from "../../../../firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { toast } from "react-toastify";
import { deleteProductById } from "../../../api/product/deleteProductById";
import updateProduct from "../../../api/product/update";
import { getCategories } from "../../../api/category/getCategories";
import Button from "../../../components/button";

const initialForm: Product = {
  id: 0,
  name: "",
  brand: "",
  description: "",
  price: 0,
  Category: undefined,
  img: "",
  imgRef: "",
};

const ProductDetail: NextPage = () => {
  const [product, setProduct] = useState<Product>(initialForm);
  const [imageUpload, setImageUpload] = useState<File>();
  const [displayImg, setDisplayImg] = useState<string>(product.img ?? "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(product.Category ?? undefined);

  const router = useRouter();
  const { id } = router.query;

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
    } else {
      if (imageUpload === undefined) {
        updateProduct({
          brand: product.brand,
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: selectedCategory ? selectedCategory.id : 0,
          id: product.id,
          img: product.img,
          imgRef: product.imgRef,
        })
          .then((res) => {
            if (res.success) {
              toast.success("product updated");
              router.push("/admin/products");
            } else {
              toast.error("product not updated");
            }
          })
          .catch((err) => {
            toast.error("product update failed");
          });
      } else {
        const imageRef = ref(
          storage,
          `images/products/${product.name}-${product.brand}-${imageUpload.name}`
        );
        const deleteRef = ref(storage, product.imgRef);
        uploadBytes(imageRef, imageUpload)
          .then((res) => {
            toast.success("image uploaded");
            getDownloadURL(imageRef)
              .then((url) => {
                updateProduct({
                  brand: product.brand,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  categoryId: selectedCategory ? selectedCategory.id : 0,
                  id: product.id,
                  img: url,
                  imgRef: `images/products/${product.name}-${product.brand}-${imageUpload.name}`,
                })
                  .then((res) => {
                    if (res.success) {
                      toast.success("product updated");
                      deleteObject(deleteRef).then((res) => {
                        console.log("image deleted");
                      });
                      router.push("/admin/products");
                    } else {
                      toast.error("product not updated");
                      deleteObject(imageRef).then((res) => {
                        console.log("image deleted");
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("product update failed");
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
            toast.error("image upload failed");
            return;
          });
      }
    }
  };

  const deleteHandler = (id: number) => {
    deleteProductById(id)
      .then((res) => {
        if (res.data) {
          toast.success("Product deleted successfully");
          if (imageUpload) {
            const imageRef = ref(storage, product.imgRef);
            deleteObject(imageRef).then((res) => {
              console.log("image deleted");
            });
          }
          router.push("/admin/products");
        } else {
          toast.error("Product deletion failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    const productId = id as string;
    getProductById(+productId)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setProduct(res.data);
          setDisplayImg(res.data.img);
          setSelectedCategory(res.data.Category);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getCategories()
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setCategories(res.data);
        } else {
          toast.error("No categories found");
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
              <Grid
                container
                flexDirection={"row"}
                justifyContent="space-between"
              >
                <Grid item xs={4}>
                  <div className={styles.title}>Product N: {product.id} </div>
                </Grid>
                <Grid item xs={4} textAlign="end">
                  <Button
                    onClick={() => deleteHandler(product.id)}
                    text={"Delete Product"}
                    type="button"
                    borderRadius={10}
                  />
                </Grid>
              </Grid>
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
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Category :</div>
                  </Grid>
                  <Grid item xs={2.5}>
                    <select
                      className={styles.adminSelect}
                      value={categories.findIndex(
                        (categ) => categ.id === selectedCategory?.id
                      )}
                      onChange={(event) => {
                        if ((event.target.value as unknown as number) == 0) {
                          setSelectedCategory(undefined);
                        }
                        setSelectedCategory(
                          categories[event.target.value as unknown as number]
                        );
                      }}
                    >
                      <option value={undefined} className={styles.adminOption}>
                        {"None"}
                      </option>
                      {categories.map((category, index) => (
                        <option
                          key={index}
                          value={index}
                          defaultChecked={category.id === product.Category?.id}
                          className={styles.adminOption}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Image :</div>
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
