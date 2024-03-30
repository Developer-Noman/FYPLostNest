import React from "react";
import classes from "./ChartComp.module.css";
import { Fragment, useEffect, useState } from "react";
import Noti from "../notificationOverlay/noti";
import Example from "../../components/stats/chart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChartComp = () => {
  const [count, setCount] = useState({});

  useEffect(() => {
    fetch("/api/stats/getposts")
      .then((response) => response.json())
      .then((data) => {
        setCount(data);
      })
      .catch((error) => {
        toast.error(error.message, { theme: "colored" });
      });
  }, []);


  return (
    <Fragment>
      <ToastContainer closeOnClick />
      <div className={classes.main}>
        <Example postscount={count} />
        <ul className={classes.ulist}>
          <li className={classes.listitem}>
            <b>Total Posted Items: </b>
            {count.totalPosts ? count.totalPosts : 10}
          </li>
          <li className={classes.listitem}>
            <b>Lost Posted Items:</b> {count.totalPosts ? count.lostPosts : 7}
          </li>
          <li>
            <b>Found Posted Items:</b> {count.totalPosts ? count.foundPosts : 3}
          </li>
        </ul>
      </div>
      {!count.totalPosts && <Noti data="Updating Stats..." />}
    </Fragment>
  );
};

export default ChartComp;
