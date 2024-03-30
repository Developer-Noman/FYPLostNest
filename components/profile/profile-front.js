import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Loading from "../UI/Loading";
import PersonalProfile from "./profilecomp/userprofile-comp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactSpinner from "../UI/reactspinner"

function ProfileFront() {
  const [isData, setIsData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/profile/profiledata")
      .then((response) => response.json())
      .then((data) => {
        setIsData(data);
        setIsLoading(false); // Move this here
      })
      .catch((error) => {
        toast.error("Error fetching profile data", { theme: "colored" });

        setIsLoading(false); // Make sure to handle errors as well
      });
  }, []);

  if (isLoading) {
    return <ReactSpinner isLoading={isLoading} />;
  }

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <PersonalProfile
        name={isData.name}
        id={isData._id}
        email={isData.email}
        image={isData.image}
      />
    </Fragment>
  );
}

export default ProfileFront;
