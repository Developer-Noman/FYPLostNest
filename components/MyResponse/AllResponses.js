import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import ResponseGrid from "./ResponseGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorAlert from "../UI/error-alert";
import ReactSpinner from "../UI/reactspinner"


const AllResponses = () => {
  const [isData, setIsData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    setIsLoading(true);

    fetch("/api/answers/sendResponse")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setIsData(data);
          if (data && data.length > 0) {
            toast.success("Responses fetched.", { theme: "colored" });
          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          toast.error(
            "Internal Server Error: Unable to fetch and Display Responses",
            { theme: "colored" }
          );
          setIsLoading(false);
        }
      });

    //Cleanup function
    return () => {
      isMounted = false; // Set flag to false when component is unmounted
    };
  }, []);

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <div>
        {isData.length === 0 && !isLoading ? (
          <ErrorAlert>
            <p
              style={{
                fontSize: "1.5rem",
                display: "flex",
                marginTop: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No Responses Found...
            </p>
          </ErrorAlert>
        ) : (
          <ResponseGrid data={isData} />
        )}
        {isLoading && <ReactSpinner isLoading={isLoading} />}
      </div>
    </Fragment>
  );
};

export default AllResponses;
