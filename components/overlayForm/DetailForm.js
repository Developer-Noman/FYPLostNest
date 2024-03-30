import React, { Fragment } from "react";
import classes from "./DetailForm.module.css";
import { useRef, useState } from "react";

const DetailForm = (props) => {
  const { ItemTitle, PostID, PosterID, Question, Answer } = props.senderData;
  const [isLoading, setIsLoading] = useState(false);

  const ResponseData = useRef();

  async function sendMessage(
    enteredInformations,
    ItemTitle,
    PostID,
    PosterID,
    Question,
    combinedDateTime,
    Answer
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

  async function InfosubmitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const enteredInformations = ResponseData.current.value;

    const result = await sendMessage(
      enteredInformations,
      ItemTitle,
      PostID,
      PosterID,
      Question,
      combinedDateTime,
      Answer
    );
    event.target.reset();
    setIsLoading(false);
  }

  if (isLoading) {
    return <div style={{ fontSize: "1.5rem" }}>Submiting...</div>;
  }
  return (
    <Fragment>
      <form className={classes.form} onSubmit={InfosubmitHandler}>
        <label htmlFor="contactInformations">Enter Contact Informations</label>
        <textarea
          type="text"
          name="contactInformations"
          rows={4}
          
          style={{fontSize:"10px",padding:"6px"}}
          placeholder="your Gmail or cell number."
          className="block w-3/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ref={ResponseData}
          required
        ></textarea>
<div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" role="button" onClick={props.close} className="text-xl font-semibold leading-6 text-white-900">
          Cancel
        </button>
        <button
          type="submit"
          role="button"
          className="rounded-md bg-indigo-600 px-12 py-4 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
      </form>
    </Fragment>
  );
};

export default DetailForm;
