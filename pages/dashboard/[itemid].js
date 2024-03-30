import React, { useState, useEffect } from "react";
import Head from "next/head";

import { Fragment } from "react";
import EventSummary from "../../components/feed/FeedDetails/event-summary";
import EventLogistics from "../../components/feed/FeedDetails/event-logistics";
import EventContent from "../../components/feed/FeedDetails/event-content";
import QuestionForm from "../../components/overlayForm/QuestionForm";
import classes from "./itemid.module.css";
import { getPostDataById } from "../../lib/db";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";

import Button from "../../components/UI/Button";

import Loading from "../../components/UI/Loading";

function ItemDetailPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showQForm, setIsShowQForm] = useState(false);
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

  const showModeHandler = () => {
    setIsShowQForm(true);
  };
  const hideModeHandler = () => {
    setIsShowQForm(false);
  };

  return (
    <Fragment>
      <Head>
        <title>{event.Title}</title>
        <meta name="description" content={event.Description} />
        <link rel="icon" href="/images/LostNestLogo.svg" />
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
      <div className={classes.btndiv}>
        <a onClick={showModeHandler}>
          <Button content={`Claim This ${event.Title}`}></Button>
        </a>
      </div>

      {showQForm && <QuestionForm onclose={hideModeHandler} data={event} />}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const postId = context.params.itemid;
  const postData = await getPostDataById(postId);

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

export default ItemDetailPage;
