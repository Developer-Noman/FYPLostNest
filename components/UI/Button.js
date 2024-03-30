import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button role="button" className={classes.btn}>
      {props.content}
    </button>
  );
};

export default Button;
