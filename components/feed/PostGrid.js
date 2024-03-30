import React from "react";
import PostItem from "./PostItem";


function PostGrid(props) {
  const { data } = props;

  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      {Array.isArray(data)
        ? data.map((post) => <PostItem key={post._id} data={post} />)
        : "Loading..."}
    </ul>
    
  );
}

export default PostGrid;
