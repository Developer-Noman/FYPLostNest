import React from "react";
import Specificitem from "./SpecificItem";
import ReactSpinner from "../UI/reactspinner";

const SpecificGrid = (props) => {
  const { data } = props;
  if (!Array.isArray(data)) {
    return <ReactSpinner isLoading={true} />;
  }

  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      {data.map((post) => (
        <Specificitem key={post._id} data={post} />
      ))}
    </ul>
  );
};

export default SpecificGrid;
