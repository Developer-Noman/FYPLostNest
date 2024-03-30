import React from "react";
import { Fragment } from "react";
import AllResponses from "../../components/MyResponse/AllResponses";
import Head from "next/head";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
const MyResponses = () => {
  return (
    <Fragment>
      <Head>
        <title>Responses</title>
        <meta name="description" content="All Responses stored here" />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>

      <h6
        style={{
          color: "#2e186a",
          margin: "auto",
          fontSize: "2.2rem",
          padding: "0.5rem 0",
          borderBottom: "3px solid #2e186a",
          width: "15rem",
          textAlign: "center",
          paddingTop: "3rem",
        }}
      >
        My Responses
      </h6>
      <AllResponses />
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
export default MyResponses;
