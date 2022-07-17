import { Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import Button from "../button";
import classes from "./offersCard.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SeeMore from "../seeMore";

interface Props {
  img: string;
  discount: number;
}

const OffersCard: FunctionComponent<Props> = ({ discount, img }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
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
            {isMobile ? (
              <></>
            ) : (
              <>
                <div className={classes.imageSection}>
                  <Image
                    src={img}
                    alt="logo"
                    layout="fixed"
                    height={300}
                    width={565}
                  />
                </div>
                {/* <SeeMore justifyContent="flex-start" onClick={() => {}} /> */}
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OffersCard;
