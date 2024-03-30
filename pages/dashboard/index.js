import React, { useState } from "react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import AllItems from "../../components/feed/AllItems";
import classes from "./index.module.css";

import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import PostSearch from "../../components/feed/Post-Search";

const dashboard = () => {
  const router = useRouter();
  const findEventHandler = (year, month, category) => {
    const fullPath = `/dashboard/${year}/${month}/${category}`;
    router.push(fullPath);
  };

  const [isMode, setIsMode] = useState(false);

  const changeModeHandler = () => {
    setIsMode((prevMode) => !prevMode);
  };

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="All Posted items who are either Lost or Found"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            paddingTop: "3rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3.2rem" }}>Welcome To LostNest</h1>
          <h3 style={{ textAlign: "center", fontSize: "1.5rem" }}>
            Thank You for being a part of LostNest community and helping each
            other.
          </h3>
          <h6
            style={{
              color: "#2e186a",
              margin: "auto",
              fontSize: "2.2rem",
              fontWeight: "500",
              padding: "0.5rem 0",
              borderBottom: "3px solid #2e186a",
              width: "15rem",
              textAlign: "center",
            }}
          >
            Posted Items
          </h6>
        </div>

        <div className={classes.btndiv}>
          <button className={classes.filterbtn} onClick={changeModeHandler}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6.1 17.25a3 3 0 0 1 5.8 0h8.85a.75.75 0 1 1 0 1.5h-8.84a3 3 0 0 1-5.82 0H3.25a.75.75 0 1 1 0-1.5h2.84zm6-6a3 3 0 0 1 5.8 0h2.85a.75.75 0 1 1 0 1.5h-2.84a3 3 0 0 1-5.82 0H3.25a.75.75 0 1 1 0-1.5h8.84zm-6-6a3 3 0 0 1 5.8 0h8.85a.75.75 0 1 1 0 1.5h-8.84a3 3 0 0 1-5.82 0H3.25a.75.75 0 0 1 0-1.5h2.84zM9 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-6 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                ></path>
              </svg>
            </span>
            <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              All Filters
            </span>
          </button>
        </div>
        {isMode && (
          <div className={classes.slideInFromLeft}>
            <PostSearch onSearch={findEventHandler}></PostSearch>
          </div>
        )}

        <AllItems />
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
export default dashboard;
