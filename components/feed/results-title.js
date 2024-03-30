import Button from "../UI/Button";
import classes from "./results-title.module.css";
import Link from "next/link";

function ResultsTitle(props) {
  const { date, cat } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1 class="text-3xl md:text-2xl lg:text-2xl xl:text-2xl font-bold mb-6">
        Posts in{" "}
        <span
          style={{
            textDecoration: "underline",
            textTransform: "uppercase",
            color: "#311465",
          }}
        >
          {humanReadableDate}
        </span>{" "}
        belongs to Category{" "}
        <span
          style={{
            textDecoration: "underline",
            textTransform: "uppercase",
            color: "#311465",
          }}
        >
          {cat}
        </span>
      </h1>

      <Link href="/dashboard" legacyBehavior>
        <a>
          <Button content="Show all Posts" />
        </a>
      </Link>
    </section>
  );
}

export default ResultsTitle;
