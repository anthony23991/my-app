import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import { Category } from "../../../api/utils/types/category.type";
import { getCategoryById } from "../../../api/category/getCategoryById";

const initialForm: Category = {
  id: 0,
  name: "",
  type: "",
  products: [],
};

const CategoryDetail: NextPage = () => {
  const [category, setCategory] = useState<Category>(initialForm);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(category);
    event.preventDefault();
  };

  useEffect(() => {
    const categoryId = id as string;
    getCategoryById(+category)
      .then((res) => {
        if (res.data) {
          setCategory(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <div className={styles.title}>Category N: {category.id} </div>
              <form onSubmit={handleSubmit}>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Name :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={category.name}
                      onChange={(event) => {
                        setCategory({ ...category, name: event.target.value });
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
                      value={category.type}
                      onChange={(event) => {
                        setCategory({ ...category, type: event.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                {/* Put products to add and remove */}
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

export default CategoryDetail;
