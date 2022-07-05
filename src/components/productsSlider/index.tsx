import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import Button from "../button";
import classes from "./productsSlider.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Carousel from "react-material-ui-carousel";
import { Product } from "../../../types";
import SeeMore from "../seeMore";

interface Props {
  products: Product[];
}

const ProductsSlider: FunctionComponent<Props> = ({ products }) => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.sliderBg}></div>
        <div className={classes.sliderSection}>
          <Carousel
            swipe={true}
            navButtonsProps={{
              style: {
                backgroundColor: "#a04120",
                opacity: 0.4,
                width: 50,
                height: 50,
              },
            }}
            animation="slide"
            className={classes.carousel}
          >
            {products.map((product, index) => (
              <div key={index}>
                <Grid minHeight={600} container padding={15}>
                  <Grid item xs={6} padding={5}>
                    <div className={classes.productBrand}>{product.brand}</div>
                    <div className={classes.productName}>{product.name}</div>
                    <SeeMore onClick={() => {}} />
                  </Grid>
                  <Grid item xs={6} textAlign={"center"} paddingTop={"5%"}>
                    <Image
                      style={{ justifySelf: "center" }}
                      src="/about-img.png"
                      alt="logo"
                      layout="intrinsic"
                      width={250}
                      height={250}
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsSlider;
