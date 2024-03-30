import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import { Fragment } from "react";
import Head from "next/head";
import { TodayOutline, GridOutline, MenuOutline } from "react-ionicons";
function EventLogistics(props) {
  const { Type, Category, Title, Date, ReducedImg } = props;

  return (
    <Fragment>
      <Head>
        <title>{Title}</title>
        <meta name="description" content={Title} />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <section className={classes.logistics}>
        <div className={classes.image}>
          <img src={ReducedImg} alt={Title} width={400} height={400} />
        </div>
        <ul className={classes.list}>
          <LogisticsItem>
            <div className={classes.centerdiv}>
            <span className={classes.spaner}>
              <TodayOutline color={"#00000"} height="25px" width="25px" />
            </span>

            <time>
              <span className={classes.timer}> {Date}</span>
            </time>
            </div>
          </LogisticsItem>
          <LogisticsItem>
            <div className={classes.centerdiv}>
            <span className={classes.spaner}>
              <MenuOutline color={"#00000"} height="25px" width="25px" />
            </span>
            <div>{Type}</div>
            </div>
          </LogisticsItem>
          <LogisticsItem>
            <div className={classes.centerdiv}>
            <span className={classes.spaner}>
              <GridOutline color={"#00000"} height="25px" width="25px" />
            </span>
            <div>{Category}</div>
            </div>
          </LogisticsItem>
        </ul>
      </section>
    </Fragment>
  );
}

export default EventLogistics;
