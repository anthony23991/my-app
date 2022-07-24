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
import { Review } from "../../../api/utils/types/review.type";
import { getReviewById } from "../../../api/review/getReviewById";

const initialForm: Review = {
  id: 0,
  authorName: "",
  img: "",
  text: "",
};

const ReviewDetail: NextPage = () => {
  const [review, setReview] = useState<Review>(initialForm);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(review);
    event.preventDefault();
  };

  useEffect(() => {
    const reviewId = id as string;
    getReviewById(+reviewId)
      .then((res) => {
        if (res.data) {
          setReview(res.data);
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
              <div className={styles.title}>Review N: {review.id} </div>
              <form onSubmit={handleSubmit}>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Author Name :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={review.authorName}
                      onChange={(event) => {
                        setReview({
                          ...review,
                          authorName: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Image :</div>
                  </Grid>
                  <Grid item>
                    <input
                      type={"file"}
                      value={review.text}
                      onChange={(event) => {
                        console.log(event.target.files);
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
                      Text :
                    </div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={review.text}
                      onChange={(event) => {
                        setReview({ ...review, text: event.target.value });
                      }}
                    />
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

export default ReviewDetail;
