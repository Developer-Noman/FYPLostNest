import React from "react";
import { Fragment } from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ResponseLoading from "../../components/notificationOverlay/ResponseLoad";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/error-alert";
import ResultsTitle from "../../components/feed/results-title";
import PostGrid from "../../components/feed/PostGrid";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";

const FilteredPosts = () => {
  const router = useRouter();

  const filterData = router.query.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const filteredCategory = filterData[2];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  //console.log(filterData);

  const [isData, setIsData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    setIsLoading(true);

    fetch("/api/post/postitem")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setIsData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          toast.error("An error occurred while fetching Posts.", {
            theme: "colored",
          });
          setIsLoading(false);
        }
      });

    //Cleanup function
    return () => {
      isMounted = false; // Set flag to false when component is unmounted
    };
  }, []);

  //console.log(isData);

  let pageHeadData = (
    <Head>
      <title>Filtered Posts</title>
      <meta name="description" content={`A list of filtered posts`} />
    </Head>
  );

  if (isLoading) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Please wait patiently. Posts are being retrieved</p>
        </ErrorAlert>
        <ResponseLoading con="Loading"></ResponseLoading>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Posts</title>
      <meta
        name="description"
        content={`All posts for ${numMonth}/${numYear}/${filteredCategory}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2023 ||
    numMonth < 1 ||
    numMonth > 12 ||
    !isData
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ToastContainer autoClose={1500} draggable closeOnClick />
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="/dashboard" legacyBehavior>
            <a>
              <Button content="Show all Posts" />
            </a>
          </Link>
        </div>
      </Fragment>
    );
  }

  if (!Array.isArray(isData)) {
    return (
      <Fragment>
        {pageHeadData}
        <ToastContainer autoClose={1500} draggable closeOnClick />
        <ErrorAlert>
          <p>There is an issue in data. Please Try Again.</p>
        </ErrorAlert>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="/dashboard" legacyBehavior>
            <a>
              <Button content="Show all Posts" />
            </a>
          </Link>
        </div>
      </Fragment>
    );
  }
  const filteredPosts = isData.filter((event) => {
    const eventDate = new Date(event.Date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1 &&
      event.Category === filteredCategory
    );
  });

  //console.log(filteredPosts);

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ToastContainer autoClose={1500} draggable closeOnClick />
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href="/dashboard" legacyBehavior>
            <a>
              <Button content="Show all Posts" />
            </a>
          </Link>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <ResultsTitle date={date} cat={filteredCategory}></ResultsTitle>
      <PostGrid data={filteredPosts} />
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

export default FilteredPosts;
