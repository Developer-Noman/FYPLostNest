import { useEffect, useState } from "react";

import AnswerList from "./answer-list";
import classes from "./answer.module.css";
import Button from "../UI/Button";
import ErrorAlert from "../UI/error-alert";
//http://localhost:3000/mylistings/654bc2921efc6c1070461e13
function Answer(props) {
  const { postid } = props;
  //console.log(postid);
  const [showResponse, setShowResponse] = useState(false);
  const [showLoadingContent, setLoadingContent] = useState(false);
  const [response, setresponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (showResponse) {
        setLoadingContent(true);
        try {
          const response = await fetch("/api/answers/" + postid);
          const data = await response.json();
          setresponse(data.responses);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle errors as needed
        } finally {
          setLoadingContent(false);
        }
      }
    };

    // Only fetch data if showResponse is true and responses are not already available
    if (showResponse && response.length === 0) {
      fetchData();
    }
  }, [showResponse]);

  function toggleResponseHandler() {
    setShowResponse((prevStatus) => !prevStatus);
  }

  return (
    <section className={classes.responses}>
      <div className={classes.btndiv}>
        <a onClick={toggleResponseHandler}>
          <Button
            content={showResponse ? "Hide Responses" : "Show Responses"}
          ></Button>
        </a>
      </div>
      {showLoadingContent && (
        
        <p
          style={{
            marginBottom: "1rem",
            marginTop: "1rem",
            fontSize: "1.5rem",
            textTransform: "capitalize",
          }}
        >
          getting responses...
        </p>
      )}
      {response.length === 0 && !showLoadingContent && (
        <ErrorAlert>
        <p
          style={{
            marginBottom: "1rem",
            marginTop: "1rem",
            fontSize: "1.5rem",
            textTransform: "capitalize",
          }}
        >
          No responses have been received yet.
        </p>
        </ErrorAlert>
      )}
      {showResponse && <AnswerList ansitems={response} />}
    </section>
  );
}

export default Answer;

