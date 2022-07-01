import classes from "./footer.module.scss";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import FooterInput from "../../footer/footerInput";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InstaCard from "../../footer/instaCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [email, setEmail] = useState("");

  const onChange = (value: string) => {
    setEmail(value);
  };

  const facebookHandler = () => {};
  const twitterHandler = () => {};
  const linkedInHandler = () => {};
  return (
    <>
      <footer className={classes.footer}>
        <Grid
          justifyContent={"center"}
          textAlign={"center"}
          paddingRight={7}
          paddingLeft={7}
          paddingTop={5}
          paddingBottom={5}
        >
          <Grid container justifyContent={"center"} marginBottom={5}>
            <Grid item xs={8} marginRight={3}>
              <FooterInput
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
                value={email}
                placeholder={"Email"}
              />
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"flex-start"}
              >
                <Grid item marginRight={2} xs={2} onClick={facebookHandler}>
                  <div className={classes.socialMediaIcon}>
                    <FacebookIcon fontSize="medium" />
                  </div>
                </Grid>
                <Grid item marginRight={2} xs={2} onClick={twitterHandler}>
                  <div className={classes.socialMediaIcon}>
                    <TwitterIcon fontSize="medium" />
                  </div>
                </Grid>
                <Grid
                  item
                  marginRight={2}
                  xs={2}
                  justifyContent="center"
                  onClick={linkedInHandler}
                >
                  <div className={classes.socialMediaIcon}>
                    <LinkedInIcon fontSize="medium" />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} paddingLeft={0}>
              <div className={classes.footerTitle}>Menu</div>
              <div className={classes.footerList}>
                <a href={"/"}>Home</a>
              </div>
              <div className={classes.footerList}>
                <a href={"/AboutUs"}>About</a>
              </div>
              <div className={classes.footerList}>
                <a href={"/"}>Products</a>
              </div>
              <div className={classes.footerList}>
                <a href={"/"}>Testimonial</a>
              </div>
              <div className={classes.footerList}>
                <a href={"/"}>Contact Us</a>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.footerTitle}>Instagram</div>
              <InstaCard
                height={"50px"}
                width={"50px"}
                text={"long established fact that a reader"}
                imgSrc={"/about-img.png"}
              />
              <InstaCard
                height={"50px"}
                width={"50px"}
                text={"long established fact that a reader"}
                imgSrc={"/about-img.png"}
              />
            </Grid>
            <Grid item xs={3}>
              <div className={classes.footerTitle}>Company</div>
              <div
                className={classes.footerList}
                style={{
                  paddingLeft: "10%",
                  // paddingRight: "10%",
                  textAlign: "left",
                }}
              >
                when looking at its layout. The point of using Lorem Ipsum is
                that it has a more-or-less normal distribution of letters, as
                opposed to
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.footerTitle}>Contact Us</div>
              <div className={classes.footerList}>
                <a href={"/contactUs"}>
                  <Grid
                    container
                    flexDirection={"row"}
                    paddingLeft={3}
                    className={classes.footerListItem}
                  >
                    <Grid item marginRight={2}>
                      <LocationOnIcon />
                    </Grid>
                    <Grid item>
                      <div>Location</div>
                    </Grid>
                  </Grid>
                </a>
                <a href={"/"}>
                  <Grid
                    container
                    flexDirection={"row"}
                    paddingLeft={3}
                    className={classes.footerListItem}
                  >
                    <Grid item marginRight={2}>
                      <LocalPhoneIcon />
                    </Grid>
                    <Grid item>
                      <div>Call +01 1234567890</div>
                    </Grid>
                  </Grid>
                </a>
                <a href={"/"}>
                  <Grid
                    container
                    flexDirection={"row"}
                    paddingLeft={3}
                    className={classes.footerListItem}
                  >
                    <Grid item marginRight={2}>
                      <EmailIcon />
                    </Grid>
                    <Grid item>
                      <div>demo@gmail.com</div>
                    </Grid>
                  </Grid>
                </a>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
};

export default Footer;
