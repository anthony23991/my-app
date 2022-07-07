import React, { FunctionComponent } from "react";
import classes from "./seeMore.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  onClick: () => void;
  justifyContent: "flex-start" | "flex-end" | "center";
}

const SeeMore: FunctionComponent<Props> = ({ onClick, justifyContent }) => {
  return (
    <React.Fragment>
      <div
        className={classes.moreSection}
        style={{ justifyContent: justifyContent }}
      >
        <a
          href="javascript: void(0)"
          onClick={onClick}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className={classes.moreText}>Read More</div>
          <ArrowRightAltIcon
            style={{ transform: "scaleX(2)" }}
            fontSize="large"
          />
        </a>
      </div>
    </React.Fragment>
  );
};

export default SeeMore;
