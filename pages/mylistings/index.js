import React from "react";
import { Fragment } from "react";
import Specificpost from "../../components/mylistings/Specificpost";

import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import classes from "./indexmain.module.css";
import Head from "next/head";

const MyListings = () => {
  return (
    <Fragment>
      <Head>
        <title>My Listings</title>
        <meta name="description" content="All of your Posted Items" />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <section>
        <h6 className={classes.head6}>My Listings</h6>
        <Specificpost />
      </section>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default MyListings;
