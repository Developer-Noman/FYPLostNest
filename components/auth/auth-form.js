import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "../UI/Button";
import classes from "./auth-form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import Footer from "../Global/Footer";
import Link from "next/link";
import ReactSpinner from "../UI/reactspinner";


function AuthForm() {
  const [toggleForms, setToggleForms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  async function createUser(email, password, enteredName) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, enteredName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    } else {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    return data;
  }

  const toggleForm = () => {
    setToggleForms((prev) => !prev);
  };
  const loginEmailInputRef = useRef();
  const loginPasswordInputRef = useRef();

  const registerEmailInputRef = useRef();
  const registerPasswordInputRef = useRef();
  const registerNameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = loginEmailInputRef.current.value;
    const enteredPassword = loginPasswordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace("/dashboard");
        toast.success("Success!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false);
      }
      if (result.error) {
        toast.error(result.error, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false);
      }
    }
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length < 7) {
      setPasswordError("Password should be at least 7 characters long");
    } else {
      setPasswordError("");
    }
  };
  async function submitHandlerRegister(event) {
    setIsLoading(true);
    event.preventDefault();

    const enteredEmail = registerEmailInputRef.current.value;
    const enteredPassword = registerPasswordInputRef.current.value;
    const enteredName = registerNameInputRef.current.value;
    // optional: Add validation

    const result = await createUser(enteredEmail, enteredPassword, enteredName);
    setIsLoading(false);
  }

  if (isLoading) {
    return <ReactSpinner isLoading={isLoading} />;
  }

  return (
    <Fragment>
      <ToastContainer />
      <div className={classes.col1}>
        <div className={classes.formbox}>
          <div className={classes.form}>
            {!toggleForms && (
              <form className={classes.loginform} onSubmit={submitHandler}>
                <center>
                  <h1 className={classes.mainheading}>Login Form</h1>
                </center>
                <input
                  type="email"
                  placeholder="email-id"
                  ref={loginEmailInputRef}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  ref={loginPasswordInputRef}
                  required
                />
                <div className="text-right pb-4">
                  <Link
                    href="/forget-password"
                    className="text-white text-lg hover:text-gray-300"
                  >
                    Forgot password ?
                  </Link>
                </div>
                <Button
                  content="LOGIN"
                  onClick={switchAuthModeHandler}
                ></Button>

                <p className={classes.message}>
                  Not Registered&nbsp;?&nbsp;
                  <a onClick={toggleForm} className={classes.link}>
                    Register
                  </a>
                </p>
              </form>
            )}

            {toggleForms && (
              <form
                className={classes.registerform}
                onSubmit={submitHandlerRegister}
              >
                <center>
                  <h1 className={classes.mainheading}>Register Form</h1>
                </center>
                <input
                  type="text"
                  placeholder="user name"
                  ref={registerNameInputRef}
                  required
                />
                <input
                  type="email"
                  placeholder="email-id"
                  ref={registerEmailInputRef}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  ref={registerPasswordInputRef}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#f4f4f4",
                      marginBottom: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    {passwordError}
                  </div>
                )}
                <Button
                  content="REGISTER"
                  onClick={switchAuthModeHandler}
                ></Button>

                <p className={classes.message}>
                  Already Registered&nbsp;?&nbsp;
                  <a onClick={toggleForm} className={classes.link}>
                    Login
                  </a>
                </p>
              </form>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "5px",
              }}
            >
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="px-10 py-5 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-blue-500"
                onClick={() => signIn("google")}
              >
                <svg
                  class="mr-2 -ml-1 w-8 h-8"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                <span style={{ fontSize: "1.5rem" }}>Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default AuthForm;
