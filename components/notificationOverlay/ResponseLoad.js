import React from "react";
import { createPortal } from "react-dom";
import classes from "./Loadings.module.css";

const ResponseLoading = (props) => {
  return createPortal(
    <div className={classes.loadingcontainer}>
      <div className={classes.bouncingdots}>
        <div className={classes.loadingText}>{props.con}</div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </div>
    </div>,
    document.getElementById("Loading")
  );
};

export default ResponseLoading;
