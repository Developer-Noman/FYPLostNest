import React from "react";
import Image from "next/image";

import classes from "./HomeMain.module.css";
import Link from "next/link";
import Button from "../UI/Button";
import Vision from "./Vision";

const HomeMain = () => {
  return (
    <>
      <section className={classes.sec1}>
        <div className={classes.part1}>
          <h1 id="title-h">Lost and Found</h1>
          <p>Lost it. List it. Find it.</p>

          <Link href="#section3" legacyBehavior>
            <a>
              <Button content="Get Started" />
            </a>
          </Link>
        </div>

        <div className={classes.part2}>
          <div className="image">
            <Image
              src="/images/developer.png"
              width={250}
              height={150}
              alt="loading"
              priority
            ></Image>
          </div>
        </div>
      </section>
      <Vision />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "14rem 6rem 20rem 6rem",
        }}
        id="section3"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mb-16 px-6 md:px-16"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="w-max mb-8">
            <h6 className={classes.sectionheading}>How it works?</h6>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div
              style={{
                borderRadius: "2rem", // Border radius
                padding: "1rem", // Padding
                backgroundColor: "#f4f4f4", // Black background
                boxShadow: "0px 5px 25px 20px rgb(204 204 204 / 75%)", // Box shadow
              }}
              className="fmb-4 flex justify-center items-center flex-col info-card"
            >
              <Image
                src="/images/login.png"
                alt="Sign up image"
                width={150}
                height={150}
                className="mb-4"
              />
              <h4 className="text-2xl font-semibold mb-2">Create an account</h4>
              <p className="text-lg text-center">
                To begin, you'll need to create an account.
              </p>
              <Link href="/auth" legacyBehavior>
                <a className="mt-4">
                  <Button content="Sign Up" />
                </a>
              </Link>
            </div>
            <div
              style={{
                borderRadius: "2rem", // Border radius
                padding: "1rem", // Padding
                backgroundColor: "#f4f4f4", // Black background
                boxShadow: "0px 5px 25px 20px rgb(204 204 204 / 75%)", // Box shadow
              }}
              className="mb-4 flex justify-center items-center flex-col info-card"
            >
              <Image
                src="/images/listitem.png"
                alt="lost and found list image"
                width={150}
                height={150}
                className="mb-4"
              />
              <h4 className="text-2xl font-semibold mb-2">
                List Lost/Found Item
              </h4>
              <p className="text-lg text-center">
                List your item by filling certain details.
              </p>
            </div>
            <div
              style={{
                borderRadius: "2rem", // Border radius
                padding: "1rem", // Padding
                backgroundColor: "#f4f4f4", // Black background
                boxShadow: "0px 5px 25px 20px rgb(204 204 204 / 75%)", // Box shadow
              }}
              className="mb-4 flex justify-center items-center flex-col info-card"
            >
              <Image
                src="/images/notification.png"
                alt="get Notified Image"
                width={150}
                height={150}
                className="mb-4"
              />
              <h4 className="text-2xl font-semibold mb-2">Get Notified</h4>
              <p className="text-lg text-center">
                We notify registered users of listed items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="section3" className={classes.sec3}>
        <div className={classes.totalabout}>
          <div className={classes.aboutheading}>
            <h6 className={classes.sectionheading}>How it works?</h6>
          </div>
          <div className={classes.aboutcard}>
            <div className={classes.info}>
              <Image
                src="/images/listitem.png"
                alt="Sign up image"
                width={150}
                height={150}
              />
              <h4 className={classes.head}>Create an account</h4>
              <p className={classes.para}>
              To begin, you'll need to create an account.
              </p>
              <Link href="/auth" legacyBehavior>
                <a>
                  <Button content="Sign Up" />
                </a>
              </Link>
             
            </div>
            <div className={classes.info}>
              <Image
                src="/images/login.png"
                style={{ width: "200px", height: "130px" }}
                alt="lost and found list image"
                width={150}
                height={150}
              />
              <h4 className={classes.head}>List Lost/Found Item</h4>
              <p className={classes.para}>
                List your item by filling certain details.
              </p>
            </div>
            <div className={classes.info}>
              <Image
                src="/images/notification.png"
                style={{ width: "200px", height: "130px" }}
                alt="get Notified Image"
                width={150}
                height={150}
              />
              <h4 className={classes.head}>Get Notified</h4>
              <p className={classes.para}>
                We notify registered users of listed items.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default HomeMain;
