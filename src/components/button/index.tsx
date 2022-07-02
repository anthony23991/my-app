import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import classes from "./button.module.scss";

interface Props {
  type: "button" | "submit" | "reset";
  text: string;
  onClick: () => void;
}

const Button: FunctionComponent<Props> = ({ type, text, onClick }) => {
  return (
    <React.Fragment>
      <button className={classes.button} type={type} onClick={onClick}>
        {text}
      </button>
    </React.Fragment>
  );
};

export default Button;
