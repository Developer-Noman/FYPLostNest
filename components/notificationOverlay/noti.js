// // noti.js
// import React, { useEffect, useState } from "react";

// import classes from "./noti.module.css";
// import { createPortal } from "react-dom";

// const Noti = (props) => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     setShow(true);

//     const timer = setTimeout(() => {
//       setShow(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return createPortal(
//     <div className={`${classes.notification} ${show ? classes.show : ""}`}>
//       <div className={classes.tick}>✔</div>
//       {props.data}
//     </div>,
//     document.getElementById("Notification")
//   );
// };

// export default Noti;

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./noti.module.css";

const Noti = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Check if we're in a browser environment before using document
  if (typeof window === "undefined") {
    return null; // Return null during server-side rendering
  }

  return createPortal(
    <div className={`${classes.notification} ${show ? classes.show : ""}`}>
      <div className={classes.tick}>✔</div>
      {props.data}
    </div>,
    document.getElementById("Notification")
  );
};

export default Noti;
