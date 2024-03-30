import React from "react";
import classes from "./Footer.module.css";
//import Head from "next/head";
import Head from "next/script";
import { Fragment } from "react";
import Link from "next/link";
function Footer() {
  return (
    <Fragment>
      <Head>
        <title>Lost Nest</title>
        <meta
          name="description"
          content="Lost and Found Hub for University Students"
        />
        <link rel="icon" href="/images/logos.png" />
      </Head>
      <footer className={classes.footer}>
        <div className={classes.waves}>
          <div className={classes.wave} id="wave1"></div>
          <div className={classes.wave} id="wave2"></div>
          <div className={classes.wave} id="wave3"></div>
          <div className={classes.wave} id="wave4"></div>
        </div>

        <div className={classes.center}>
          <ul className={classes.menu}>
            <li className={classes.menuitem}>
              <Link href="/" legacyBehavior>
                <a className={classes.menulink}>Home</a>
              </Link>
            </li>
            <li className={classes.menuitem}>
              <Link href="/auth" legacyBehavior>
                <a className={classes.menulink}>Login</a>
              </Link>
            </li>
            <li className={classes.menuitem}>
              <Link href="/stats" legacyBehavior>
                <a className={classes.menulink}>Stats</a>
              </Link>
            </li>
            <li className={classes.menuitem}>
              <Link
                href="/privacypolicy"
                legacyBehavior
              >
                <a className={classes.menulink}>Privacy Policy</a>
              </Link>
            </li>
          </ul>
          <p className={classes.head2}>
            <b>
              Ghufran Ullah(20-SE-34) and Noman Shafique(20-SE-38) proudly
              present their final year project under the supervision of Sir
              Mubbashir Ayub.
            </b>
          </p>
        </div>
        <div className={classes.footerbg}>
          <div className={classes.footerbgone}></div>
          <div className={classes.footerbgtwo}></div>
        </div>
      </footer>
    </Fragment>
  );
}

export default Footer;
