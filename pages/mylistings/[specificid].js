import React, { useState, useEffect, Fragment } from "react";
import Loading from "../../components/UI/Loading";
import EventSummary from "../../components/feed/FeedDetails/event-summary";
import EventLogistics from "../../components/feed/FeedDetails/event-logistics";
import EventContent from "../../components/feed/FeedDetails/event-content";

import Head from "next/head";
import Answer from "../../components/answers/answer";

import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { getPostDataById } from "../../lib/db";

function specificid(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [processedObject, setProcessedObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { extractedObject } = props;

      if (typeof extractedObject === "object") {
        setProcessedObject(extractedObject);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    };

    fetchData();
  }, [props.extractedObject]);

  if (isLoading || !processedObject) {
    return <Loading />;
  }

  const event = processedObject;

  return (
    <Fragment>
      <Head>
        <title>{event.Title}</title>
        <meta name="description" content={event.Description} />
      </Head>
      <EventSummary Title={event.Title} />

      <EventLogistics
        Date={event.Date}
        ReducedImg={event.ReducedImg}
        Title={event.Title}
        Type={event.Type}
        Category={event.Category}
      />

      <EventContent>
        <p>{event.Description}</p>
      </EventContent>

      <Answer postid={event._id} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { specificid } = params;

  const postData = await getPostDataById(specificid);

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
    props: {
      extractedObject: JSON.parse(JSON.stringify(postData)),
    },
  };
}

export default specificid;
