import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form";

function QuestionForm(props) {
  return ReactDOM.createPortal(
    <Form oncancle={props.onclose} data2={props.data} />,

    document.getElementById("Questions")
  );
}

export default QuestionForm;
