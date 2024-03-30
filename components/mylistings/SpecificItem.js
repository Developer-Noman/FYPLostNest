import React from "react";
import classes from "./SpecificItem.module.css";

import Button from "../UI/Button";
import Link from "next/link";

function Specificitem(props) {
  const {
    _id,
    Type,
    Category,
    Title,
    Description,
    Question,
    Date,
    ReducedImg,
    posterEmail,
  } = props.data;

  const detailLink = `/mylistings/${_id}`;

  return (


    <li className={classes.item}>
      <div className={classes.imgdiv}>
        <img
          src={ReducedImg}
          alt={Title}
          width={250}
          height={160}
          style={{ overflow: "scroll" }}
        ></img>
      </div>
      <div className={classes.container}>
        <div className={classes.nestedContainer}>
          <h1 className={classes.head1}>{Type}</h1>
          <h3 className={classes.head3}>{Date}</h3>
        </div>

        <div className={classes.diverr1}>
          <h2 className={classes.head2}>
            <i>Category:</i> {Category}
          </h2>
          <h2 className={classes.head2}>
            <i>Item Name:</i> {Title}
          </h2>
        </div>
      </div>
      <div className={classes.anchordiv}>
        <Link href={detailLink} legacyBehavior>
          <a>
            <Button content="Check Response" />
          </a>
        </Link>
      </div>
    </li>
  );
}

export default Specificitem;
