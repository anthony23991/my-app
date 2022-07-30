import { Grid, Link } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AdminMenu from "../../components/layout/adminMenu";
import styles from "../../styles/Admin.module.css";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "../../components/button";
import { getCategories } from "../../api/category/getCategories";
import { useEffect, useState } from "react";
import { Category } from "../../api/utils/types/category.type";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Product } from "../../api/utils/types/product.type";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <div>{params.value}</div>
        <Link
          className={styles.detail}
          href={`/admin/category/${params.value}`}
        >
          <RemoveRedEyeIcon fontSize="medium" />
        </Link>
      </>
    ),
  },
  { field: "name", headerName: "Name", width: 130 },
  { field: "type", headerName: "Type", width: 130 },
  {
    field: "products",
    headerName: "Products",
    width: 450,
    sortable: false,
    renderCell: (params: GridRenderCellParams) =>
      params.value.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      )),
  },
];

const AdminCategories: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
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
          <Grid item xs={10} padding={5}>
            <Grid container>
              <Grid item xs={10}>
                <div className={styles.title}>Categories</div>
              </Grid>
              <Grid item xs={2} justifyContent={"flex-end"}>
                <Link href={"/admin/category/create"}>
                  <Button
                    text="Add Category"
                    onClick={() => {}}
                    type="button"
                    borderRadius={5}
                  />
                </Link>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={categories}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick={true}
                style={{ borderWidth: 5, borderRadius: 8 }}
              />
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default AdminCategories;
