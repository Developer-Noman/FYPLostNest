import React, { Fragment } from "react";
import classes from "./AForm.module.css";
import DetailForm from "./DetailForm";
import { useState } from "react";

function AForm(props) {
  const {
    _id,
    Answer,
    ItemTitle,
    PostID,
    PosterID,
    Question,
    SubmittedDateTime,
  } = props.data2;
  const [isYes, setIsYes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const yesHandler = () => {
    setIsYes(true);
  };

  async function sendMessage(
    enteredInformations,
    ItemTitle,
    PostID,
    PosterID,
    Question,
    combinedDateTime
  ) {
    const response = await fetch("/api/answers/sendResponse", {
      method: "POST",
      body: JSON.stringify({
        enteredInformations,
        ItemTitle,
        PostID,
        PosterID,
        Question,
        combinedDateTime,
        Answer,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
    }

    return data;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US");
  const formattedTime = currentDate.toLocaleTimeString("en-US");
  const combinedDateTime = `${formattedDate} ${formattedTime}`;

  const noHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredInformations = "Responder has nullified the validation.";

    const result = await sendMessage(
      enteredInformations,
      ItemTitle,
      PostID,
      PosterID,
      Question,
      combinedDateTime,
      Answer
    );
    if (props.oncancle) {
      props.oncancle();
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <div style={{ fontSize: "1.5rem" }}>Submiting...</div>;
  }

  return (
    <Fragment>
      {isYes ? (
        <DetailForm close={props.oncancle} senderData={props.data2} />
      ) : (
        <div className={classes.diver}>
          <h3>{SubmittedDateTime}</h3>
          <h2>Question?</h2>
          <p className={classes.para1}>{Question}</p>
          <h2>Answer</h2>
          <p className={classes.para1}>{Answer}</p>

          <div className={classes.btndiver}>
            <button
              className={classes.button90}
              type="button"
              role="button"
              onClick={yesHandler}
            >
              Yes
            </button>
            <button
              className={classes.button90}
              type="button"
              role="button"
              onClick={noHandler}
            >
              No
            </button>
            <button
              className={classes.button90}
              type="button"
              role="button"
              onClick={props.oncancle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default AForm;
