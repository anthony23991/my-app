import { Grid, Input, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { FunctionComponent, useState } from "react";
import classes from "./cartRow.module.scss";
import { CartItem } from "../../../types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  item?: CartItem;
  onDelete: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartRow: FunctionComponent<Props> = ({
  item,
  onDelete,
  onQuantityChange,
}) => {
  const isSmall = useMediaQuery("(max-width: 450px)");
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1);

  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(quantity - 1);
      // onQuantityChange(item?.id, newQuantity);
    }
  };

  const increaseQuantityHandler = () => {
    const newQuantity = quantity + 1;
    setQuantity(quantity + 1);
    // onQuantityChange(item?.id, newQuantity);
  };

  return (
    <React.Fragment>
      {isSmall ? (
        <Grid container flexDirection={"row"} className={classes.cartRow}>
          <Grid item xs={4}>
            <Image src={"/about-img.png"} width={100} height={100} alt="" />
          </Grid>
          <Grid item xs={8} paddingLeft={2}>
            <Grid container flexDirection={"row"}>
              <Grid item xs={12}>
                {/* {item.product.brand} {item.product.name} */}
                <div style={{ textAlign: "center" }}>Snicker Kinder</div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={classes.quantitySection}
                  style={{ paddingTop: 4, justifyContent: "center" }}
                >
                  <div onClick={decreaseQuantityHandler}>
                    <RemoveIcon />
                  </div>
                  <div className={classes.quantityText}>{quantity}</div>
                  <div onClick={increaseQuantityHandler}>
                    <AddIcon />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} container flexDirection={"row"}>
                <Grid item xs={8} justifyContent={"center"}>
                  <div style={{ paddingTop: 5, paddingLeft: 5 }}>$Total</div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.delete}>
                    <div
                    // onClick={() => onDelete(item?.id)}
                    >
                      <HighlightOffIcon fontSize="large" />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container flexDirection={"row"} className={classes.cartRow}>
          <Grid item xs={isMobile ? 3 : 5} container>
            {!isMobile && (
              <Grid item xs={3}>
                <Image
                  // src={item.product.img}
                  src={"/about-img.png"}
                  alt="logo"
                  layout="fixed"
                  height={100}
                  width={100}
                />
              </Grid>
            )}
            <Grid item xs={isMobile ? 12 : 9}>
              <div className={[classes.itemTitle, classes.itemName].join(" ")}>
                {/* {item.product.brand} {item.product.name} */}
                Snicker Kinder
              </div>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.itemTitle}>
              {/* ${item.product.price} */}
              $Price
            </div>
          </Grid>
          <Grid item xs={isMobile ? 4 : 2}>
            <div className={classes.quantitySection}>
              {/* {item.quantity} */}
              <div
                onClick={() => {
                  decreaseQuantityHandler();
                }}
                style={{ cursor: "pointer" }}
              >
                <RemoveIcon />
              </div>
              <div className={classes.quantityText}>{quantity}</div>
              <div
                onClick={() => {
                  increaseQuantityHandler();
                }}
                style={{ cursor: "pointer" }}
              >
                <AddIcon />
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.itemTitle}>
              {/* ${item.product.price * item.quantity} */}
              $Total
            </div>
          </Grid>
          <Grid
            item
            xs={1}
            paddingTop={2}
            // onClick={() => {
            //   onDelete(item?.id);
            // }}
          >
            <HighlightOffIcon className={classes.deleteBtn} fontSize="large" />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default CartRow;
