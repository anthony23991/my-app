import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import classes from "./instaCard.module.scss";

interface Props {
  type: "location" | "call" | "email";
  text: string;
}

const ContactLink: FunctionComponent<Props> = ({ type, text }) => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          {type === "location" ? <></> : <></>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ContactLink;
