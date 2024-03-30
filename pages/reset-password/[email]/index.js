import { Fragment } from "react";
import React, { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function ResetPassword() {
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef();
  const CPasswordInputRef = useRef();
  const searchParam = useSearchParams();

  const router = useRouter();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredPass = passwordInputRef.current.value;
    const enteredCPass = CPasswordInputRef.current.value;

    const response = await fetch("/api/user/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email: router.query.email,
        signature: searchParam.get("signature"),
        password: enteredPass,
        password_confirmation: enteredCPass,
      }),
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

    if (data.message == "Password updated!") {
      event.target.reset();
    }
    setLoading(false);
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
          className="w-[500px] h-[250px] p-5 rounded-lg shadow-xl"
          style={{
            backgroundColor: "#f4f4f4",
            boxShadow: "0px 5px 25px 20px rgb(204 204 204 / 75%)",
          }}
        >
          <h1 className="text-2xl font-bold">Reset Passowrd ?</h1>

          <form onSubmit={submit}>
            <div className="mt-5">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                ref={passwordInputRef}
                required
              ></input>
            </div>
            <div className="mt-5">
              <label className="block">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                className="w-full h-10 p-2 border rounded-md outline-red-400"
                ref={CPasswordInputRef}
                required
              />
            </div>
            <div className="mt-5">
              <button
                className="w-full bg-purple-950 p-4 rounded-lg text-white hover:bg-purple-800"
                disabled={loading}
              >
                {loading ? "Processing.." : "Submit"}
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

export default ResetPassword;
