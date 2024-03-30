import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]";
import { Fragment } from "react";

import Head from "next/head";
import ProfileFront from "../../components/profile/profile-front";

function ProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Your Profile</title>
        <meta name="description" content="Your Profile content" />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>

      <ProfileFront />
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

export default ProfilePage;
