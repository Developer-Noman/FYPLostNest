import React, { Fragment } from "react";
import { useEffect, useState } from "react";

import SpecificGrid from "./SpecificGrid";
import Loading from "../UI/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorAlert from "../UI/error-alert";
import ReactSpinner from "../UI/reactspinner"


function Specificpost() {
  const [isData, setIsData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    setIsLoading(true);

    fetch("/api/myposts/fetchmypost")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          const dataArray = Array.isArray(data) ? data : [data];
          // if (dataArray && dataArray.length > 0) {
          //   toast.success("Successfully retrieved your posts.", {
          //     theme: "colored",
          //   });
          // }

          setIsData(dataArray);

          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          toast.error("Error retrieving your posts.", {
            theme: "colored",
          });
          setIsLoading(false);
        }
        toast.error("Error retrieving your posts.", {
          theme: "colored",
        });
      });

    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when component is unmounted
    };
  }, []);

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <div className="text-center mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
        {isData.length === 0 && !isLoading ? (
          <ErrorAlert>
            <p className="text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-2xl flex mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 justify-center items-center">
              You have not listed any posts
            </p>
          </ErrorAlert>
        ) : (
          <SpecificGrid data={isData} />
        )}
        {isLoading && <ReactSpinner isLoading={isLoading} />}
      </div>
    </Fragment>
  );
}

export default Specificpost;
