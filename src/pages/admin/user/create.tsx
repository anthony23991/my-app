import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Admin.module.css";
import AdminMenu from "../../../components/layout/adminMenu";
import { toast } from "react-toastify";
import { User, UserCreateInput } from "../../../api/utils/types/user.type";
import { useState } from "react";
import createUser from "../../../api/user/create";
import { useRouter } from "next/router";

const initialForm: UserCreateInput = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const CreateUser: NextPage = () => {
  const [user, setUser] = useState<UserCreateInput>(initialForm);
  const router = useRouter();

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
    createUser(user)
      .then((res) => {
        if (res.success) {
          toast.success("User created successfully");
          router.push("/admin/users");
        } else {
          toast.error("User creation failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div className={styles.title}>Add User</div>
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
                    <div className={styles.label}>Email :</div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
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
                      type={"password"}
                      onChange={(event) => {
                        setUser({ ...user, password: event.target.value });
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
                      Phone number :
                    </div>
                  </Grid>
                  <Grid item>
                    <input
                      className={styles.adminInput}
                      type={"text"}
                      onChange={(event) => {
                        setUser({ ...user, phoneNumber: event.target.value });
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

export default CreateUser;
