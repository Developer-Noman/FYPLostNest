import React from "react";
import classes from "./singleans.module.css";
import { useState } from "react";
import AnswerForm from "../overlayForm/AnswerForm";

const SingleAnswer = (props) => {
  const { PosterID } = props.data;
  //_id, Answer,
  const [showAForm, setIsShowAForm] = useState(false);

  const showModeHandler = () => {
    setIsShowAForm(true);
  };
  const hideModeHandler = () => {
    setIsShowAForm(false);
  };
  return (
    <li className={classes.list}>
      <p className={classes.linkpara}>
        <a onClick={showModeHandler} className={classes.link}>
          Check
        </a>
        &nbsp; Response by this user.
      </p>

      <div className={classes.responder}>
        <p>By {PosterID}</p>
      </div>
      {showAForm && <AnswerForm onclose={hideModeHandler} data={props.data} />}
    </li>
  );
};

export default SingleAnswer;
