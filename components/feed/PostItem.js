import React, { useState } from "react";
import classes from "./PostItem.module.css";
import Button from "../UI/Button";
import Link from "next/link";

function PostItem(props) {
  const {
    _id,
    Type,
    Category,
    Title,
    Description,
    Question,
    Date,
    ReducedImg,
  } = props.data;

  const detailLink = `/dashboard/${_id}`;

  return (
    <li className={classes.item}>
      <div
        className={classes.imgdiv}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={ReducedImg}
          alt={Title}
          width={250}
          height={160}
          style={{ overflow: "scroll" }}
        ></img>
      </div>
      <div className={classes.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <h1
            style={{
              backgroundColor: "#311465",
              padding: "5px 30px",
              borderTopLeftRadius: "1rem", // Add this line
              borderTopRightRadius: "1rem", // Add this line
              borderLeft: "1px solid black", // Add this line for left border
              borderRight: "1px solid black", // Add this line for right border
              fontSize: "1.5rem",
              fontWeight: "lighter",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            {Type}
          </h1>
          <h3 style={{ fontSize: "1.5rem" }}>{Date}</h3>
        </div>

        <div
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ textTransform: "capitalize" }}>Category: {Category}</h2>
          <h2 style={{ textTransform: "capitalize" }}>Item Name: {Title}</h2>
        </div>
        <h3
          style={{
            textTransform: "capitalize",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontWeight: "bolder",
              fontSize: "1.5rem",
            }}
          >
            Description:&nbsp;
          </span>
          {Description}
        </h3>
      </div>
      <div
        className={classes.actions}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Link href={detailLink} legacyBehavior>
          <a>
            <Button content="View Details" />
          </a>
        </Link>
      </div>
    </li>
  );
}

export default PostItem;
