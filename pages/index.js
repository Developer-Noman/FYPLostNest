import HomeMain from "../components/Homecomp/HomeMain";
import { Fragment } from "react";

import Footer from "../components/Global/Footer";

import Head from "next/head";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Lost Nest</title>
        <meta
          name="description"
          content="Lost and Found Hub for University Students"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>
      <HomeMain />
      <Footer></Footer>
    </Fragment>
  );
}

export default HomePage;
