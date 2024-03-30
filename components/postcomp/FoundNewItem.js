import React, { Fragment } from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadings from "../notificationOverlay/Loadings";

function FoundNewItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImage, setIsImage] = useState("");
  const [fileError, setFileError] = useState("");

  const typeInputRef = useRef();
  const categoryInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const questionInputRef = useRef();
  const dateInputRef = useRef();

  useEffect(() => {
    toast.info(
      "If you can't make a post, Use mobile data. Eduroam has restrictions.",
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

  async function sendEmails(
    subject,
    enteredType,
    enteredCategory,
    Date,
    enteredDescription,
    enteredTitle
  ) {
    const response = await fetch("/api/email/sendEmail", {
      method: "POST",
      body: JSON.stringify({
        subject,

        enteredType,
        enteredCategory,
        Date,
        enteredDescription,
        enteredTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      console.log(data.error);
      toast.error("Error in sending email to registered users.", {
        theme: "colored",
      });
    }
    if (data.success) {
      toast.success(data.message, { theme: "colored" });
    }

    return data;
  }

  async function sendPostData(
    Type,
    Category,
    Title,
    Description,
    Question,
    Date,
    imageInbase64
  ) {
    const response = await fetch("/api/post/postitem", {
      method: "POST",
      body: JSON.stringify({
        Type,
        Category,
        Title,
        Description,
        Question,
        Date,
        ReducedImg: imageInbase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);

      toast.error(data.message, { theme: "colored" });
    } else {
      toast.success(data.message, { theme: "colored" });
    }

    return data;
  }
  function converttobase64(e) {
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check the file type
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg"
      ) {
        setFileError(""); // Reset file error
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          setIsImage(reader.result);
        };

        reader.onerror = () => {
          console.log("Error reading the file");
        };
      } else {
        // File type not allowed
        setFileError(
          "Invalid file type. Please select a PNG or JPEG/JPG file."
        );
      }
    }
  }
  const postSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredType = typeInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuestion = questionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    const humanReadableDate = new Date(enteredDate).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    const subject = `LostNest Alert: ${enteredType} - ${enteredTitle}`;

    const result = await sendPostData(
      enteredType,
      enteredCategory,
      enteredTitle,
      enteredDescription,
      enteredQuestion,
      humanReadableDate,
      isImage
    );
    if (result.message === "Item Posted Successfully!") {
      const emailres = await sendEmails(
        subject,
        enteredType,
        enteredCategory,
        humanReadableDate,
        enteredDescription,
        enteredTitle
      );
    }

    if (result.message === "Item Posted Successfully!") {
      event.target.reset();
      setIsImage(""); // Clear the image state
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <form style={{ margin: "0px 5px 0px 5px" }} onSubmit={postSubmitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              Found an Item??
            </h2>
            <p className="mt-1 text-sm leading-6 text-red-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Found"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Item type
                  </label>
                  <div className="mt-2">
                    <select
                      id="Found"
                      name="Found"
                      autoComplete="lost-name"
                      ref={typeInputRef}
                      className="block w-full rounded-md border-0 py-4 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="Found">Found</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category-name"
                      ref={categoryInputRef}
                      className="block w-full rounded-md border-0 py-4 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      required
                    >
                      <option value="Wallet">Wallet</option>
                      <option value="Card">ID Card / Student Card</option>
                      <option value="Phone or Laptop">
                        Smart Phone / Laptop
                      </option>
                      <option value="Keys">Keys</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Itemname"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Itemname"
                      style={{ fontSize: "10px" }}
                      id="Itemname"
                      autoComplete="given-name"
                      ref={titleInputRef}
                      className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    ></input>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Select a Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="date"
                      style={{ fontSize: "10px" }}
                      id="date"
                      ref={dateInputRef}
                      className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    ></input>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="question"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter question based on an item.
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="question"
                      style={{ fontSize: "10px" }}
                      id="question"
                      placeholder="Ex:- What is the color of the phone?"
                      ref={questionInputRef}
                      className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="Description"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="Description"
                    style={{ fontSize: "10px" }}
                    rows="3"
                    ref={descriptionInputRef}
                    className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  ></textarea>
                </div>
                <p className="mt-3 text-lg leading-6 text-gray-600 font-semibold">
                  Write a few sentences about item like location etc.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Item photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={converttobase64}
                        ></input>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG/JPEG up to 10MB
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-lg leading-6 text-gray-600 font-semibold">
                  Make sure the image you upload doesn't reveal the answer to
                  the security question.
                </p>
              </div>
            </div>
            {fileError && (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "1.2rem",
                  marginTop: "1rem",
                }}
              >
                {fileError}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-purple-950 px-12 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post
          </button>
        </div>
      </form>

      {isLoading && <Loadings />}
    </Fragment>
  );
}

export default FoundNewItem;
