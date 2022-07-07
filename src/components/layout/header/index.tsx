import classes from "./header.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AnimateHeight from "react-animate-height";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <header className={classes.header}>
        {isTablet ? (
          <Grid container padding={0}>
            <Grid
              item
              xs={12}
              container
              flexDirection={"row"}
              padding={0}
              justifyContent={"space-between"}
            >
              <Grid item xs={4}>
                <div className={classes.logo}>
                  <Image
                    src="/logo.jpeg"
                    alt="logo"
                    layout={isMobile ? "fixed" : undefined}
                    width={150}
                    height={100}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={2}
                marginTop={4}
                justifyContent={"right"}
                paddingRight={4}
              >
                <div style={{ justifyContent: "right", width: 40 }}>
                  <div
                    onClick={() => {
                      setIsOpened(!isOpened);
                    }}
                  >
                    {isOpened ? (
                      <CloseIcon
                        fontSize="large"
                        className={classes.menuIcon}
                      />
                    ) : (
                      <MenuIcon fontSize="large" className={classes.menuIcon} />
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AnimateHeight
                id="menu"
                duration={500}
                height={isOpened ? 350 : 0} // see props documentation below
              >
                <Grid
                  container
                  justifyContent={"center"}
                  className={classes.menu}
                  flexDirection={"column"}
                >
                  <Grid
                    item
                    xs={12}
                    margin={2}
                    className={classes.menuItem}
                    textAlign={"center"}
                  >
                    <a href="/">Home</a>
                  </Grid>
                  <Grid
                    item
                    margin={2}
                    className={classes.menuItem}
                    textAlign={"center"}
                  >
                    <a href="aboutUs">About</a>
                  </Grid>
                  <Grid
                    item
                    margin={2}
                    className={classes.menuItem}
                    textAlign={"center"}
                  >
                    <a href="/products">Products</a>
                  </Grid>
                  <Grid
                    item
                    margin={2}
                    className={classes.menuItem}
                    textAlign={"center"}
                  >
                    <a href="/testimonial">Testimonial</a>
                  </Grid>
                  <Grid
                    item
                    margin={2}
                    className={classes.menuItem}
                    textAlign={"center"}
                  >
                    <a href="/contactUs">Contact Us</a>
                  </Grid>
                </Grid>
              </AnimateHeight>
            </Grid>
          </Grid>
        ) : (
          <Grid container flexDirection={"row"} padding={0}>
            <Grid item xs={4}>
              <div className={classes.logo}>
                <Image src="/logo.jpeg" alt="logo" width={150} height={100} />
              </div>
            </Grid>
            <Grid
              item
              xs={8}
              marginTop={5}
              paddingRight={"10%"}
              paddingLeft={"10%"}
            >
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
                  <a href="/products">Products</a>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <a href="/testimonial">Testimonial</a>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <a href="/contactUs">Contact Us</a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </header>
    </>
  );
};

export default Header;
