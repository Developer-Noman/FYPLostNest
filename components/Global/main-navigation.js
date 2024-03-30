import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function MainNavigation() {
  const { data: session, status } = useSession();
  const [showHam, setIsShowHam] = useState(false);
  const showHamBurger = () => {
    setIsShowHam(!showHam);
  };

  function logoutHandler(event) {
    event.preventDefault();
    signOut();
  }

  return (
    <header className={classes.header}>
      <div className={classes.navi}>
        <Link href="/" className={classes.imgdiv} legacyBehavior>
          <div className={classes.new}>
            <img
              src="/images/LostNestLogo.svg"
              alt="logoimg"
              className={classes.imagest}
            />
            <h5>LostNest</h5>
          </div>
        </Link>

        <nav
          className={
            showHam
              ? `${classes.mainnav} ${classes.togglenav}`
              : `${classes.mainnav}`
          }
        >
          <ul className={classes.loginnav}>
            {status === "authenticated" && (
              <>
                <li style={{ padding: "5px" }} className={classes.anch}>
                  <Link href="/dashboard">Feed</Link>
                </li>
                <li style={{ padding: "5px" }} className={classes.anch}>
                  <Link href="/postlostitem">Lost Item?</Link>
                </li>
                <li style={{ padding: "5px" }} className={classes.anch}>
                  <Link href="/postfounditem">Found Item?</Link>
                </li>
                <li style={{ padding: "5px" }} className={classes.anch}>
                  <Link href="/mylistings">My Listings</Link>
                </li>
                <li style={{ padding: "5px" }} className={classes.anch}>
                  <Link href="/responses">Response</Link>
                </li>
                <li style={{ padding: "5px" }} className={classes.anch}>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className={classes.btn}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {status !== "authenticated" && (
              <li style={{ padding: "5px" }} className={classes.anch}>
                <Link href="/stats">Stats</Link>
              </li>
            )}
            {status !== "authenticated" && (
              <li>
                <Link href="/auth" legacyBehavior>
                  <a>
                    <Button content="Login" />
                  </a>
                </Link>
              </li>
            )}
          </ul>
          {showHam && <p onClick={showHamBurger} className={classes.pa}></p>}
        </nav>
        <div className={classes.hamburger}>
          <div onClick={showHamBurger}>
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
