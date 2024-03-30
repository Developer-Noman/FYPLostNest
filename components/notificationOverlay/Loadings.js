// Loadings.js
import React from "react";
import { createPortal } from "react-dom";
import classes from "./Loadings.module.css";

const Loadings = () => {
  return createPortal(
    <div className={classes.loadingcontainer}>
      <div className={classes.bouncingdots}>
        <div className={classes.loadingText}>Loading</div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </div>
    </div>,
    document.getElementById("Loading")
  );
};

export default Loadings;
