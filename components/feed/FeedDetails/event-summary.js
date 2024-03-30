import classes from "./event-summary.module.css";

function EventSummary(props) {
  const { Title } = props;

  return (
    <section className={classes.summary}>
      <h1>{Title}</h1>
    </section>
  );
}

export default EventSummary;
