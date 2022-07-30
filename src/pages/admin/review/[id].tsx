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
import { toast } from "react-toastify";
import storage from "../../../../firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { deleteReviewById } from "../../../api/review/deleteReviewById";
import Button from "../../../components/button";
import updateReview from "../../../api/review/update";

const initialForm: Review = {
  id: 0,
  authorName: "",
  img: "",
  imgRef: "",
  text: "",
};

const ReviewDetail: NextPage = () => {
  const [review, setReview] = useState<Review>(initialForm);
  const [imageUpload, setImageUpload] = useState<File>();
  const [displayImg, setDisplayImg] = useState<string>(review.img ?? "");

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

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
    } else {
      if (imageUpload === undefined) {
        updateReview({
          ...review,
          img: review.img,
          imgRef: review.imgRef,
        })
          .then((res) => {
            toast.success("review updated");
            router.push("/admin/reviews");
          })
          .catch((err) => {
            toast.error("review update failed");
          });
      } else {
        const imageRef = ref(
          storage,
          `images/reviews/${review.authorName}-${imageUpload.name}`
        );
        const deleteRef = ref(storage, review.imgRef);
        uploadBytes(imageRef, imageUpload)
          .then((res) => {
            toast.success("image uploaded");
            getDownloadURL(imageRef)
              .then((url) => {
                updateReview({
                  ...review,
                  img: url,
                  imgRef: `images/reviews/${review.authorName}-${imageUpload.name}`,
                })
                  .then((res) => {
                    if (res.success) {
                      toast.success("review updated");
                      deleteObject(deleteRef).then((res) => {
                        console.log("image deleted");
                      });
                      router.push("/admin/reviews");
                    } else {
                      toast.error("review not updated");
                      deleteObject(imageRef).then((res) => {
                        console.log("image deleted");
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("review update failed");
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
    deleteReviewById(id)
      .then((res) => {
        if (res.data) {
          toast.success("Review deleted successfully");
          if (imageUpload) {
            const imageRef = ref(storage, review.imgRef);
            deleteObject(imageRef).then((res) => {
              console.log("image deleted");
            });
          }
          router.push("/admin/reviews");
        } else {
          toast.error("Review deletion failed");
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
    const reviewId = id as string;
    getReviewById(+reviewId)
      .then((res) => {
        if (res.data) {
          setReview(res.data);
          setDisplayImg(res.data.img);
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
                  <div className={styles.title}>Review N: {review.id} </div>
                </Grid>
                <Grid item xs={4} textAlign="end">
                  <Button
                    onClick={() => deleteHandler(review.id)}
                    text={"Delete Review"}
                    type="button"
                    borderRadius={10}
                  />
                </Grid>
              </Grid>
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
                    <div
                      className={styles.label}
                      style={{ paddingTop: "0rem" }}
                    >
                      Text :
                    </div>
                  </Grid>
                  <Grid item xs={5}>
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

export default ReviewDetail;
