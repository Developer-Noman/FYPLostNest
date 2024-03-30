import React from "react";
import AForm from "./AForm";
import ReactDOM from "react-dom";
import classes from "./AnswerForm.module.css";

const AnswerForm = (props) => {
  return ReactDOM.createPortal(
    <div className={classes.backer}>
      <div className={classes.formContainer}>
        <AForm oncancle={props.onclose} data2={props.data} />
      </div>
    </div>,
    document.getElementById("Answers")
  );
};

export default AnswerForm;
