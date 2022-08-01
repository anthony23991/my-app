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
import { User } from "../../../api/utils/types/user.type";
import { getUserById } from "../../../api/user/getUserById";
import { toast } from "react-toastify";
import updateUser from "../../../api/user/updateUser";
import Button from "../../../components/button";
import { deleteUserById } from "../../../api/user/deleteUserById";

const initialForm: User = {
  id: 0,
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  connected: false,
  cart: [],
  history: [],
};

const UserDetail: NextPage = () => {
  const [user, setUser] = useState<User>(initialForm);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.name?.length === 0) {
      toast.error("Name should not be empty");
      return;
    } else if (user.email?.length < 5) {
      toast.error("Email should be valid");
      return;
    } else if (user.password?.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    } else if (user.phoneNumber?.length < 8) {
      toast.error("Phone number should be valid");
      return;
    }
    updateUser(user)
      .then((res) => {
        if (res.success) {
          toast.success("User updated successfully");
          router.push("/admin/users");
        } else {
          toast.error("User update failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id: number) => {
    deleteUserById(id)
      .then((res) => {
        if (res.data) {
          toast.success("User deleted successfully");
          router.push("/admin/users");
        } else {
          toast.error("User deletion failed");
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
    const userId = id as string;
    console.log("getting", userId);
    getUserById(+userId)
      .then((res) => {
        if (res.data) {
          setUser(res.data);
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
                  <div className={styles.title}>User N: {user.id} </div>
                </Grid>
                <Grid item xs={4} textAlign="end">
                  <Button
                    onClick={() => deleteHandler(user.id)}
                    text={"Delete User"}
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
                      value={user.name}
                      onChange={(event) => {
                        setUser({
                          ...user,
                          name: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection={"row"} marginBottom={3}>
                  <Grid item xs={2}>
                    <div className={styles.label}>Phone Number :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={user.phoneNumber}
                      onChange={(event) => {
                        setUser({
                          ...user,
                          phoneNumber: event.target.value,
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
                      Email :
                    </div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={user.email}
                      onChange={(event) => {
                        setUser({ ...user, email: event.target.value });
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
                      Password :
                    </div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      value={user.password}
                      onChange={(event) => {
                        setUser({ ...user, password: event.target.value });
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

export default UserDetail;
