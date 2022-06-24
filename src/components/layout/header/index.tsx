import classes from "./header.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";

const Header = () => {
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <header className={classes.header}>
        <Grid container flexDirection={"column"} padding={5}>
          <Grid item xs={isMobile ? 12 : 6}>
            <div className={classes.logo}>
              <Image
                src="/logo.png"
                alt="logo"
                width={isMobile ? 100 : 100}
                height={isMobile ? 100 : 20}
              />
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 6}>
            <Grid
              container
              justifyContent={"space-between"}
              className={classes.menu}
            >
              <Grid item className={classes.menuItem}>
                <a href="/">Home</a>
              </Grid>
              <Grid item className={classes.menuItem}>
                <a href="aboutUs">About</a>
              </Grid>
              <Grid item className={classes.menuItem}>
                <a href="#">Products</a>
              </Grid>
              <Grid item className={classes.menuItem}>
                <a href="#">Testimonial</a>
              </Grid>
              <Grid item className={classes.menuItem}>
                <a href="#">Contact Us</a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default Header;
