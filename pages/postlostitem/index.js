import React, { Fragment } from "react";
import classes from "./PostItem.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";
import PostNewItem from "../../components/postcomp/PostNewItem";

function PostItem() {
  return (
    <Fragment>
      <Head>
        <title>Post Lost Item</title>
        <meta
          name="description"
          content="If you have Lost anything post here"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <div className={classes.centermain}>
        <div className={classes.center}>
          <PostNewItem />
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
export default PostItem;
