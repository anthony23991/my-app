import { Grid } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent, useState } from "react";
import classes from "./productCard.module.scss";

interface Props {
  img: string;
  title: string;
  price: number;
}

const ProductCard: FunctionComponent<Props> = ({ img, title, price }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <React.Fragment>
      <div
        className={classes.container}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Image src={img} alt="logo" layout="fixed" height={190} width={200} />
        {isHovering && (
          <div className={classes.priceSection}>
            <div
              className={[classes.productName, classes.poppinsFontBold].join(
                " "
              )}
            >
              {title}
            </div>
            <div
              className={[classes.productPrice, classes.poppinsFontBold].join(
                " "
              )}
            >
              $ {price}
            </div>
            <a href="">
              <div
                className={[classes.buyNow, classes.poppinRegular].join(" ")}
              >
                BUY NOW
              </div>
            </a>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
