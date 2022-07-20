import classes from "./adminMenu.module.scss";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";

const AdminMenu = () => {
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const isTablet = useMediaQuery("(max-width: 800px)");
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  return (
    <Grid
      container
      className={classes.menuContainer}
      padding={4}
      paddingBottom={10}
    >
      <Grid
        item
        justifyContent={"center"}
        alignItems={"center"}
        paddingLeft={5}
      >
        <Image src="/logo-no-bg.png" alt="logo" width={150} height={100} />
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid item xs={3} paddingTop={3}>
          <PersonIcon fontSize="large" />
        </Grid>

        <Grid item xs={8} className={classes.menuItem} paddingTop={2}>
          <Link href={"/admin/users"}>User</Link>
        </Grid>
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid item xs={3} paddingTop={3}>
          <Inventory2Icon fontSize="large" />
        </Grid>

        <Grid item xs={8} className={classes.menuItem} paddingTop={2}>
          <Link href={"/admin/products"}>Product</Link>
        </Grid>
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid item xs={3} paddingTop={3}>
          <RemoveRedEyeIcon fontSize="large" />
        </Grid>

        <Grid item xs={8} className={classes.menuItem} paddingTop={2}>
          <Link href={"/admin/reviews"}>Review</Link>
        </Grid>
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid item xs={3} paddingTop={3}>
          <CategoryIcon fontSize="large" />
        </Grid>

        <Grid item xs={8} className={classes.menuItem} paddingTop={2}>
          <Link href={"/admin/categories"}>Category</Link>
        </Grid>
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid item xs={3} paddingTop={3}>
          <ShoppingBagIcon fontSize="large" />
        </Grid>

        <Grid item xs={8} className={classes.menuItem} paddingTop={2}>
          <Link href={"/admin/orders"}>Order</Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;
