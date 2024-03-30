import React, { Fragment } from "react";

import classes from "./Form.module.css";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ResponseLoading from "../notificationOverlay/ResponseLoad";

function Form(props) {
  const [isLoading, setIsLoading] = useState(false);
  const answerInputRef = useRef();

  async function sendQuestionData(
    enteredAnswer,
    postID,
    ItemTitle,
    Question,
    combinedDateTime
  ) {
    const response = await fetch("/api/qresponse/QuestionResponse", {
      method: "POST",
      body: JSON.stringify({
        enteredAnswer,
        postID,
        ItemTitle,
        Question,
        combinedDateTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      toast.error(data.message, { theme: "colored" });
    } else {
      toast.success(data.message, { theme: "colored" });
    }

    return data;
  }
  const postID = props.data2._id;
  const ItemTitle = props.data2.Title;
  const Question = props.data2.Question;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US");
  const formattedTime = currentDate.toLocaleTimeString("en-US");
  const combinedDateTime = `${formattedDate} ${formattedTime}`;

  const answerSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredAnswer = answerInputRef.current.value;

    const result = await sendQuestionData(
      enteredAnswer,
      postID,
      ItemTitle,
      Question,
      combinedDateTime
    );

    // console.log(result);
    event.target.reset(); // This resets the form
    setIsLoading(false);
  };

  if (isLoading) {
    return <ResponseLoading con="Submitting"></ResponseLoading>;
   
  }

  return (
    <Fragment>
      <ToastContainer draggable closeOnClick />
      <div
        class="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
        // className={classes.loadingcontainer}
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div class="pointer-events-auto relative w-screen max-w-2xl">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                  className={classes.loadingcontainer}
                >
                  <div className={classes.imgdiv}>
                    <img
                      src="/images/LostNestLogo.svg"
                      alt="logoimg"
                      className={classes.imagest}
                    />
                  </div>
                  <form className={classes.main} onSubmit={answerSubmitHandler}>
                    <div className={classes.top}>
                      <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                        Important Note
                      </h2>
                      <p class="mt-1 text-lg leading-6 text-gray-600">
                        This is the security Question related to the Item that
                        is being listed here.
                      </p>
                    </div>
                    <div className={classes.marginm}>
                      <div className={classes.grider}>
                        <label htmlFor="question" className={classes.labels}>
                          Question?
                        </label>
                        <span id="questionContent" className={classes.span1}>
                          {props.data2.Question}
                        </span>
                      </div>
                      <div className={classes.grider}>
                        <label htmlFor="answer" className={classes.labels}>
                          Answer :
                        </label>
                        <input
                          type="text"
                          id="answer"
                          style={{
                            fontSize: "10px",
                            padding: "6px",
                            border: "1px solid black",
                          }}
                          class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ref={answerInputRef}
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={props.oncancle}
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;
