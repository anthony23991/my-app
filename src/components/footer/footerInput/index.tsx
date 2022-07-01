import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import React, { FunctionComponent } from "react";
import classes from "./footerInput.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FooterInput: FunctionComponent<Props> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={10}>
          <input
            className={classes.footerInput}
            type={"email"}
            placeholder={placeholder ?? ""}
            onChange={onChange}
            value={value}
          />
        </Grid>
        <Grid
          item
          xs={2}
          minHeight={"50px"}
          color={"white"}
          className={classes.submitArrowCard}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FooterInput;
