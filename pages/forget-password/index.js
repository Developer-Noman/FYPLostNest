import { Fragment } from "react";
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Link from "next/link";

async function forgetpassword(email) {
  const response = await fetch("/api/user/forget-password", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message, { theme: "colored" });
  } else {
    toast.success(data.message, { theme: "colored" });
  }

  return data;
}

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    toast.info(
      "If you are unable to find mail in inbox. Do check spam folder.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const result = await forgetpassword(email);
    setLoading(false);
    if (
      result.message === "Email sent successfully. Please check your inbox."
    ) {
      event.target.reset();
    }
  };

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
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <div
        className="h-screen w-screen flex justify-center items-center"
        style={{ paddingBottom: "10rem" }}
      >
        <div
          className="w-[500px] h-[200px] p-5 rounded-lg shadow-xl"
          style={{
            backgroundColor: "#f4f4f4",
            boxShadow: "0px 5px 25px 20px rgb(204 204 204 / 75%)",
          }}
        >
          <h1 className="text-2xl font-bold">Forgot Passowrd ?</h1>
          <p>
            Don't worry it happens. just enter your email below and we will send
            an email to you.
          </p>
          <form onSubmit={submit}>
            <div className="mt-5">
              <label className="block">Email</label>
              <input
                type="email"
                placeholder="email-id"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mt-5">
              <button
                className="w-full bg-purple-950 p-4 rounded-lg text-white hover:bg-purple-800"
                disabled={loading}
              >
                {loading ? "Processing" : "Submit"}
              </button>
            </div>
            <div className="mt-5 text-center">
              <Link
                href="/auth"
                className="text-black-400 text-lg hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default ForgetPassword;
