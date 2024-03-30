import React from "react";
import ContactForm from "../../components/stats/ContactForm";
import { Fragment } from "react";

import ChartComp from "../../components/stats/ChartComp";
import Head from "next/head";

function statistics() {
  return (
    <Fragment>
      <Head>
        <title>Stats</title>
        <meta
          name="description"
          content="Lost and Found Hub for University Students"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <ChartComp />
      <ContactForm />
    </Fragment>
  );
}

export default statistics;
