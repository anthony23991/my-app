import { Grid, Link } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AdminMenu from "../../components/layout/adminMenu";
import styles from "../../styles/Admin.module.css";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Category } from "../../api/utils/types/category.type";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/product/getProducts";
import { Product } from "../../api/utils/types/product.type";
import Button from "../../components/button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <div>{params.value}</div>
        <Link className={styles.detail} href={`/admin/product/${params.value}`}>
          <RemoveRedEyeIcon fontSize="medium" />
        </Link>
      </>
    ),
  },
  { field: "name", headerName: "Name", width: 130 },
  { field: "brand", headerName: "Brand", width: 130 },
  {
    field: "img",
    headerName: "Image",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "Category",
    headerName: "Category Name",
    width: 200,
    valueGetter: (params: any) =>
      `${params.value ? params.value.name : "no category"}`,
  },
];

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  if (products.length !== 0) {
    console.log(products);
    console.log(products[0].Category);
  }

  useEffect(() => {
    getProducts()
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setProducts(res.data);
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
                <div className={styles.title}>Products</div>
              </Grid>
              <Grid item xs={2} justifyContent={"flex-end"}>
                <Link href={"/admin/product/create"}>
                  <Button
                    text="Add Product"
                    onClick={() => {}}
                    type="button"
                    borderRadius={5}
                  />
                </Link>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={products}
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

export default Products;
