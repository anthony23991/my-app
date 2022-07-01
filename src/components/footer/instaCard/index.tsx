import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import classes from "./instaCard.module.scss";

interface Props {
  imgSrc: string;
  text: string;
  alt?: string;
  width: string;
  height: string;
}

const InstaCard: FunctionComponent<Props> = ({
  imgSrc,
  text,
  alt,
  width,
  height,
}) => {
  return (
    <React.Fragment>
      <Grid container padding={2}>
        <Grid item xs={3}>
          <Image
            src={imgSrc}
            alt={!!alt ? alt : undefined}
            width={width}
            height={height}
          ></Image>
        </Grid>
        <Grid item xs={9} className={classes.CardText}>
          {text}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InstaCard;
