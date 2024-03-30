import React from "react";
import Head from "next/head";
import { Fragment } from "react";
import classes from "./ErrorComp.module.css";
import Link from "next/link";
import Button from "./Button";

function ErrorComp(props) {
  const handleButtonClick = () => {
    window.location.reload();
  };
  return (
    <Fragment>
      <Head>
        <title>Lost Nest</title>
        <meta name="Error Page" content="Page is lost due to some issue" />
        <link rel="icon" href="/images/logos.png" />
      </Head>
      <section className={classes.sec}>
        <div className={classes.div1}>
          <h1 className={classes.heading1}>404</h1>
          <p className={classes.para1}>{props.errorData}</p>
          <p className={classes.para2}>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
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

export default ErrorComp;
