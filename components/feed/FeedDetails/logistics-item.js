import classes from "./logistics-item.module.css";

function LogisticsItem(props) {
  return (
    <li className={classes.item}>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
