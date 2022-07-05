import React, { FunctionComponent } from "react";
import classes from "./seeMore.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  onClick: () => void;
}

const SeeMore: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <React.Fragment>
      <div className={classes.moreSection}>
        <a
          href="javascript: void(0)"
          onClick={onClick}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className={classes.moreText}>Read More</div>
          <ArrowRightAltIcon fontSize="large" />
        </a>
      </div>
    </React.Fragment>
  );
};

export default SeeMore;
