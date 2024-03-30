import { Fragment } from "react";

import styles from "./PrivacyPolicy.module.css";
import Head from "next/head";
import Footer from "../../components/Global/Footer";

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

      <div className={styles.privacyPolicy}>
        {/* <h1>LostNest Privacy Policy</h1> */}
        <h1 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl font-black">
          LostNest Privacy Policy
        </h1>

        <p>
          This document outlines the Privacy Policy for LostNest, the web
          application developed by our Team. By using LostNest, you agree to the
          terms outlined in this Privacy Policy.
        </p>

        <h2 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
          Information Collection and Use
        </h2>
        {/* <h3>
          How the Application Accesses, Uses, Stores, or Shares Google User Data
        </h3> */}

        <div className={styles.list}>
          <ul>
            <li>
              <span>
                <strong>Access:</strong> User data is accessed only when users
                choose to log in via Google OAuth. We utilize the useSession()
                hook provided by Next.js to access the current logged-in user's
                session. The session object obtained contains only three pieces
                of information: the user's Google account username, Gmail ID,
                and profile picture.
              </span>
            </li>
            <li>
              <span>
                <strong>Limited Data:</strong> LostNest strictly limits the data
                accessed to these three pieces of information; no additional
                data is retrieved.
              </span>
            </li>
            <li>
              <span>
                <strong>Storage:</strong> LostNest does not store any user data
                from Google accounts.
              </span>
            </li>
            <li>
              <span>
                <strong>Usage:</strong> The accessed data is solely used for
                displaying the user's profile information within LostNest's
                interface.
              </span>
            </li>
            <li>
              <span>
                <strong>No Sharing:</strong> Google user data is neither shared
                nor stored by LostNest beyond the user's interaction with the
                platform.
              </span>
            </li>
          </ul>
        </div>

        <h2 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
          Data Security
        </h2>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, disclosure, alteration, or destruction. Your
          privacy and security are of utmost importance to us, and we ensure
          that user data is not disclosed to any third parties.
        </p>

        <h2 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
          Third-Party Services
        </h2>
        <p>
          LostNest uses Google OAuth for user authentication. When you log in to
          LostNest using your Google account, you are subject to Google's
          Privacy Policy. We encourage you to review Google's Privacy Policy to
          understand how your information is handled by Google.
        </p>

        <h2 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any changes by posting the new Privacy
          Policy on this page. You are advised to review this Privacy Policy
          periodically for any updates.
        </p>

        <h2 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black">
          Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy or the practices
          of LostNest, please contact us at &nbsp;
          <a
            href="mailto:gcch1122@gmail.com"
            style={{ textDecoration: "underline", textTransform: "none" }}
          >
            gcch1122@gmail.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </Fragment>
  );
}

export default HomePage;
