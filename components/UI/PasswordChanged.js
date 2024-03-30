import React from "react";
import Head from "next/head";
import { Fragment } from "react";
import classes from "./ErrorComp.module.css";
import Link from "next/link";
import Button from "./Button";

function PasswordChanged(props) {
  const handleButtonClick = () => {
    window.location.reload();
  };
  return (
    <Fragment>
      <Head>
        <title>Lost Nest</title>
        <meta name="Password Changed" content="Password Changed Successfully" />
        <link rel="icon" href="/images/logos.png" />
      </Head>
      <section className={classes.sec}>
        <div className={classes.div1}>
          <h1 className={classes.heading1}>200</h1>
          <p className={classes.para1}>{props.errorData}</p>
          <p className={classes.para2}>
            Success, password changed. You'll find lots to explore on the home
            page.
          </p>
          <Link href="/" legacyBehavior>
            <a onClick={handleButtonClick}>
              <Button content="Go Back"></Button>
            </a>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}

export default PasswordChanged;
