import React from "react";
import  PropagateLoader  from "react-spinners/PropagateLoader";


const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  borderColor: "red",
  height: "100vh",
};
function ReactSpinner(props) {
  return (
    <PropagateLoader
      color="#311465"
      loading={props.isLoading}
      cssOverride={override}
      size={20}
      speedMultiplier={2}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default ReactSpinner;
