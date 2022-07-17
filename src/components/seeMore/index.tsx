import React, { FunctionComponent } from "react";
import classes from "./seeMore.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";

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
        <Link
          href="#"
          onClick={onClick}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className={classes.moreText}>Read More</div>
          <ArrowRightAltIcon
            style={{ transform: "scaleX(2)" }}
            fontSize="large"
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SeeMore;
