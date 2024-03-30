import React from "react";

import classes from "./PostItem.module.css";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { Fragment } from "react";
import FoundNewItem from "../../components/postcomp/FoundNewItem";

import Head from "next/head";

function PostLostItem() {
  return (
    <Fragment>
      <Head>
        <title>Post Found Item</title>
        <meta
          name="description"
          content="If you have found anything post here"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <div className={classes.centermain}>
        <div className={classes.center}>
          <FoundNewItem />
        </div>
      </div>
    </Fragment>
  );
}
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
export default PostLostItem;
