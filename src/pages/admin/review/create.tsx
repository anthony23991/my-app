import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/Admin.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AdminMenu from "../../../components/layout/adminMenu";
import { toast } from "react-toastify";
import {
  Review,
  ReviewCreateInput,
} from "../../../api/utils/types/review.type";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import storage from "../../../../firebaseConfig";
import createReview from "../../../api/review/create";
import { deleteDoc } from "firebase/firestore";

const initialForm: ReviewCreateInput = {
  authorName: "",
  img: "",
  text: "",
};

const CreateReview: NextPage = () => {
  const [review, setReview] = useState<ReviewCreateInput>(initialForm);
  const [imageUpload, setImageUpload] = useState<File>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(review);
    event.preventDefault();
    if (review.authorName.length == 0) {
      toast.error("Please enter author name");
      return;
    }
    if (review.text.length == 0) {
      toast.error("Please enter text");
      return;
    }
    if (imageUpload == null) {
      alert("Please choose an image!");
    } else {
      console.log(imageUpload.name);
      const imageRef = ref(
        storage,
        `images/reviews/${review.authorName}-${imageUpload.name}`
      );
      uploadBytes(imageRef, imageUpload)
        .then((res) => {
          toast.success("image uploaded");
          console.log("uplowwwww", res);
          getDownloadURL(imageRef)
            .then((url) => {
              createReview({
                ...review,
                img: url,
              })
                .then((res) => {
                  if (res.success) {
                    toast.success("review created");
                  } else {
                    toast.error("review not created");
                    deleteObject(imageRef);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("review creation failed");
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
  };

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
              <div className={styles.title}>Add Review</div>
              <form onSubmit={handleSubmit}>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Author Name :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
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
                    <div className={styles.label}>Text :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      onChange={(event) => {
                        setReview({ ...review, text: event.target.value });
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
                      onChange={(event) => {
                        if (event.target.files != null) {
                          setImageUpload(event.target.files[0]);
                        }
                      }}
                    />
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

export default CreateReview;
