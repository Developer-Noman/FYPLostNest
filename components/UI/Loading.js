// import React from "react";
// import classes from "./Loading.module.css";

// function Loading() {
//   return (
//     <div className={classes.loader}>
//       <div
//         className={`${classes.justifycontentcenter} ${classes.jimuprimaryloading}`}
//       ></div>
//     </div>
//   );
// }

// export default Loading;
import React from "react";
import classes from "./Loading.module.css";

function Loading() {
  return (
    <div className={classes.loader}>
      <div
        className={`${classes.justifycontentcenter} ${classes.jimuprimaryloading}`}
      ></div>
    </div>
  );
}

export default Loading;
