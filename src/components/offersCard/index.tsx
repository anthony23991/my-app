import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import Button from "../button";
import classes from "./offersCard.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  img: string;
  discount: number;
}

const OffersCard: FunctionComponent<Props> = ({ discount, img }) => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.offerSection}>
          <div className={classes.box}>
            <div className={classes.boxText}>
              <div className={classes.offerTitle}>Offers on Chocolates</div>
              <div className={classes.offerText}>Get {discount}% Offer</div>
              <div className={classes.offerText}>Any Products items</div>
              <Button type="button" text="BUY NOW" onClick={() => {}} />
            </div>
            <div className={classes.imageSection}>
              <Image
                src="/offer-img.png"
                alt="logo"
                layout="fixed"
                height={300}
                width={565}
              />
            </div>
            <div className={classes.moreSection}>
              <a href="" style={{ display: "flex", flexDirection: "row" }}>
                <div className={classes.moreText}>See More</div>
                <ArrowRightAltIcon fontSize="large" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OffersCard;
