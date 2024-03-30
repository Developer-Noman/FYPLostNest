import React, { Fragment } from "react";
import classes from "./ContactForm.module.css";
import Button from "../UI/Button";
import { useRef, useState } from "react";
import Footer from "../Global/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactSpinner from "../UI/reactspinner";

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const contactEmailInputRef = useRef();
  const contactMessageInputRef = useRef();
  const contactNameInputRef = useRef();

  async function sendMessage(email, message, enteredName) {
    const response = await fetch("/api/contactForm/message", {
      method: "POST",
      body: JSON.stringify({ email, message, enteredName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, { theme: "colored" });

      setIsLoading(false);
    } else {
      toast.success("message submitted!", { theme: "colored" });
    }

    return data;
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = contactEmailInputRef.current.value;
    const enteredMessage = contactMessageInputRef.current.value;
    const enteredName = contactNameInputRef.current.value;

    const result = await sendMessage(enteredEmail, enteredMessage, enteredName);
    event.target.reset();
    setIsLoading(false);
  }

  if (isLoading) {
    return <ReactSpinner isLoading={isLoading} />;
  }

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <section className={classes.totalcontactform}>
        <div className={classes.contacttitle}>
          <h6 className={classes.sectionheading}>Contact Form</h6>

          <p>
            If there is something you want to suggest or simply want to say
            hello, do reach out.
          </p>
        </div>

        <div className={classes.contactform}>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="field1">Name :</label>
              <input
                type="text"
                name="field1"
                placeholder="Enter name"
                ref={contactNameInputRef}
                required
              ></input>
              <label htmlFor="field2">Email address :</label>
              <input
                type="email"
                name="field2"
                placeholder="Enter email"
                ref={contactEmailInputRef}
                required
              />

              <label htmlFor="description">Message :</label>
              <textarea
                type="text"
                name="description"
                rows="4"
                cols="5"
                ref={contactMessageInputRef}
                required
              ></textarea>
            </div>
            <Button content="Submit"></Button>
          </form>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default ContactForm;
