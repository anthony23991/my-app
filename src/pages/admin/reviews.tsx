import { Grid, Link } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AdminMenu from "../../components/layout/adminMenu";
import styles from "../../styles/Admin.module.css";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "../../components/button";
import { Review } from "../../api/utils/types/review.type";
import { useEffect, useState } from "react";
import { getReviews } from "../../api/review/getReviews";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "../../../firebaseConfig";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "authorName", headerName: "Author name", width: 130 },
  {
    field: "img",
    headerName: "Image",
    width: 230,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Image
          src={params.value}
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </>
    ),
  },
  { field: "text", headerName: "Text", width: 330 },
];

const AdminReviews: NextPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gotReviews, setGotReviews] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    getReviews()
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setReviews(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   const newReviews = reviews;
  //   newReviews.map((review) => {
  //     const imageRef = ref(storage, review.img);
  //     getDownloadURL(imageRef)
  //       .then((url) => {
  //         console.log(url);
  //         return { ...review, img: url };
  //         // set
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  //   setReviews(newReviews);
  //   setDone(true);
  //   console.log(newReviews);
  // }, [gotReviews, reviews]);
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
                <div className={styles.title}>Reviews</div>
              </Grid>
              <Grid item xs={2} justifyContent={"flex-end"}>
                <Link href={"/admin/review/create"}>
                  <Button
                    text="Add Review"
                    onClick={() => {}}
                    type="button"
                    borderRadius={5}
                  />
                </Link>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={reviews}
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

export default AdminReviews;
