import React from "react";

import classes from "./Vision.module.css";
import Image from "next/image";
const Vision = () => {
  return (
    <section className={classes.sec2}>
      <div className={classes.firstDiv}>
  <img
    className={classes.developerimg}
    src="/images/imgres.png"
   
    alt="loading"
  />
</div>

      
      <div className={classes.inspiration}>
        <h6 className={classes.sectionheading}>Our Project Inspiration</h6>
        <p>
          On campus, students frequently face the challenge of losing valuable
          items like IDs and cards, causing stress and inconvenience. The
          current way to report and find lost items is complicated and
          scattered, making it hard for students to get their things back. In
          response to this pressing issue, the proposed "Lost and Found Hub for
          University Students" becomes a place where Lost Meets Found in the
          heart of campus life.
        </p>
      </div>
    </section>
  );
};

export default Vision;
