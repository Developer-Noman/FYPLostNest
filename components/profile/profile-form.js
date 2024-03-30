import { Fragment, useRef, useState } from "react";
import classes from "./profile-form.module.css";
import ResponseLoading from "../notificationOverlay/ResponseLoad";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileForm() {
  const [displayChange, setIsDisplayChange] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length < 7) {
      setPasswordError("Password should be at least 7 characters long");
    } else {
      setPasswordError("");
    }
  };

  async function changePasswordHandler(passwordData) {
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
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
    } catch (err) {
      toast.error("Error", { theme: "colored" });
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation
    setIsDisplayChange(true);
    await changePasswordHandler({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });

    event.target.reset();
    setIsDisplayChange(false);
  }

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <form
        className={`${classes.form} ${classes.formuserpassword}`}
        onSubmit={submitHandler}
      >
        <div className={classes.formgroup}>
          <label className={classes.formlabel} htmlFor="password-current">
            Current password
          </label>
          <input
            id="password-current"
            className={classes.forminput}
            type="password"
            placeholder="••••••••"
            ref={oldPasswordRef}
            required
          />
        </div>
        <div className={classes.formgroup}>
          <label className={classes.formlabel} htmlFor="password">
            New password
          </label>
          <input
            id="password"
            className={classes.forminput}
            type="password"
            placeholder="••••••••"
            ref={newPasswordRef}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {passwordError && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "8px",
              textDecoration: "underline",
            }}
          >
            {passwordError}
          </div>
        )}
        <div className={`${classes.formgroup} ${classes.right}`}>
          <button
            className={`${classes.btn} ${classes.btnsmall} ${classes.btngreen} ${classes.btnsavepassword}`}
          >
            Change password
          </button>
        </div>
      </form>
      {displayChange && <ResponseLoading con="Updating!" />}
    </Fragment>
  );
}

export default ProfileForm;
