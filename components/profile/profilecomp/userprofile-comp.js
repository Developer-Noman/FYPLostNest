import React, { Fragment } from "react";
import classes from "./userprofile-comp.module.css";

import ProfileForm from "../profile-form";
import Link from "next/link";
import { MdPermContactCalendar } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { FaRegListAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { SiSmartthings } from "react-icons/si";
import { IoIosHome } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

function PersonalProfile(props) {
 
  return (
    <Fragment>
      <main className={classes.main}>
        <div className={classes.userview}>
          <nav className={classes.userviewmenu}>
            <ul className={classes.sidenav}>
              <li>
                <IoIosHome />
                <Link href="/" className={classes.navitem}>
                  Home
                </Link>
              </li>
              <li>
                <MdDashboard />
                <Link className={classes.navitem} href="/dashboard">
                  Feed
                </Link>
              </li>
              <li>
                <MdPermContactCalendar />
                <Link className={classes.navitem} href="/stats">
                  Contact us & Stats
                </Link>
              </li>
              <li>
                <RiProfileLine />
                <Link href="/profile" className={classes.navitem}>
                  My Profile
                </Link>
              </li>
              <li>
                <FaRegListAlt />
                <Link href="/mylistings" className={classes.navitem}>
                  My Listings
                </Link>
              </li>
              <li>
                <MdMessage />
                <Link href="/responses" className={classes.navitem}>
                  My Responses
                </Link>
              </li>
              <li>
                <SiSmartthings />
                <Link href="/postlostitem" className={classes.navitem}>
                  Lost an Item
                </Link>
              </li>
              <li>
                <SiSmartthings />
                <Link href="/postfounditem" className={classes.navitem}>
                  Found an Item
                </Link>
              </li>
            </ul>
          </nav>

          <div className={classes.userviewcontent}>
            <div className={classes.userviewformcontainer}>
              <h2 className={`${classes.headingsecondary} ${classes.mabtmd}`}>
                Your account informations
              </h2>

              <form className={`${classes.form} ${classes.formuserdata}`}>
                <div className={classes.formgroup}>
                  <label className={classes.formlabel} htmlFor="id">
                    Id
                  </label>
                  <input
                    id="id"
                    className={`${classes.forminput} ${classes.updateName}`}
                    type="text"
                    value={props.id ? props.id : "Google Authenticated"}
                    required
                    name="id"
                    readOnly
                  />
                </div>
                <div className={classes.formgroup}>
                  <label className={classes.formlabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className={`${classes.forminput} ${classes.updateName}`}
                    type="text"
                    value={props.name}
                    required
                    name="name"
                    readOnly
                  />
                </div>
                <div className={`${classes.formgroup} ${classes.mabtmd}`}>
                  <label className={classes.formlabel} htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    className={`${classes.forminput} ${classes.updateEmail}`}
                    type="email"
                    value={props.email}
                    required
                    name="email"
                    readOnly
                  />
                </div>
                <div
                  className={`${classes.formgroup} ${classes.formphotoupload}`}
                >
                  <label htmlFor="photo">
                    Profile Picture&nbsp;&nbsp;&nbsp;
                  </label>
                  <img
                    className={classes.formuserphoto}
                    src={
                      props.image
                        ? props.image
                        : "/images/profileuser.png"
                    }
                    alt="User photo"
                  />
                </div>
              </form>

              <div className={classes.line}>&nbsp;</div>
            </div>

            <div className={classes.userviewformcontainer}>
              <h2 className={`${classes.headingsecondary} ${classes.mabtmd}`}>
                Password change
              </h2>
              <ProfileForm />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PersonalProfile;
