import {
  Avatar,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import { toast } from "react-toastify";
import { CategoryCreateInput } from "../../../api/utils/types/category.type";
import { Product } from "../../../api/utils/types/product.type";
import { getSoloProducts } from "../../../api/product/getSoloProducts";
import createCategory from "../../../api/category/create";

const initialForm: CategoryCreateInput = {
  name: "",
  products: [],
  type: "",
};

const CreateCategory: NextPage = () => {
  const [category, setCategory] = useState<CategoryCreateInput>(initialForm);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(category);
    event.preventDefault();
    if (category.name.length == 0) {
      toast.error("Please enter category name");
      return;
    }
    if (category.type.length == 0) {
      toast.error("Please enter category type");
      return;
    }
    if (selectedProducts.length == 0) {
      toast.error("Please select products");
      return;
    }
    const productsIds = selectedProducts.map((product) => product.id);
    const categoryCreateInput: CategoryCreateInput = {
      name: category.name,
      products: productsIds,
      type: category.type,
    };
    createCategory(categoryCreateInput)
      .then((resp) => {
        if (resp.success) {
          toast.success("Category created");
          setCategory(initialForm);
          setSelectedProducts([]);
          router.push("/admin/categories");
        } else {
          toast.error("Category failed to create, please try again");
        }
      })
      .catch((err) => {
        toast.error("Failed to create, please try again");
        console.log(err);
      });
  };

  // isNaN(+maybeNumber)

  const handleToggle = (value: number) => {
    const currentIndex = selectedProducts.findIndex(
      (prod) => prod.id === value
    );
    console.log(currentIndex);
    const newProdSelected = [...selectedProducts];

    if (currentIndex === -1) {
      newProdSelected.push(products.find((prod) => prod.id === value)!);
    } else {
      newProdSelected.splice(currentIndex, 1);
    }
    setSelectedProducts(newProdSelected);
  };

  useEffect(() => {
    getSoloProducts().then((res) => {
      if (res.data) {
        setProducts(res.data);
      }
    });
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
          <Grid
            item
            xs={9}
            flexDirection={"row"}
            className={styles.cardContainer}
            container
            margin={5}
          >
            <Grid item xs={6} style={{ height: "80vh" }}>
              <Grid>
                <div className={styles.title}>Add Category</div>
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
                          setCategory({
                            ...category,
                            name: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container flexDirection={"row"} marginBottom={3}>
                    <Grid item xs={2}>
                      <div className={styles.label}>Type :</div>
                    </Grid>
                    <Grid item>
                      <input
                        className={styles.adminInput}
                        type={"text"}
                        onChange={(event) => {
                          setCategory({
                            ...category,
                            type: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                  </Grid>

                  <input
                    className={[styles.adminInput, styles.submitInput].join(
                      " "
                    )}
                    type="submit"
                    value="Submit"
                  />
                </form>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container marginBottom={3} flexDirection={"column"}>
                <div className={styles.label}>Add products to category</div>
                <div style={{ height: 500, overflowY: "scroll" }}>
                  <List
                    dense
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {products.map((product) => {
                      const labelId = `checkbox-list-secondary-label-${product.name}`;
                      return (
                        <ListItem
                          key={product.id}
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              onChange={() => {
                                console.log("yawww");
                                handleToggle(product.id);
                              }}
                              checked={
                                selectedProducts.findIndex(
                                  (prod) => prod.id === product.id
                                ) !== -1
                              }
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${product.id}`}
                                src={product.img}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              id={labelId}
                              primary={`${product.name}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default CreateCategory;
