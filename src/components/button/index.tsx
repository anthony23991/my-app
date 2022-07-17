import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import classes from "./button.module.scss";

interface Props {
  type: "button" | "submit" | "reset";
  text: string;
  bgColor?: string;
  borderRadius?: number;
  borderColor?: string;
  onClick: () => void;
}

const Button: FunctionComponent<Props> = ({
  type,
  text,
  onClick,
  bgColor,
  borderRadius,
  borderColor,
}) => {
  return (
    <React.Fragment>
      <button
        className={classes.button}
        style={{
          backgroundColor: bgColor ? bgColor : "#46200b",
          borderRadius: borderRadius ? borderRadius : 0,
          borderColor: borderColor ? borderColor : "#46200b",
        }}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </React.Fragment>
  );
};

export default Button;
