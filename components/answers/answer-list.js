import classes from "./answerlist.module.css";
import SingleAnswer from "./single-answer";
function AnswerList(props) {
  const { ansitems } = props;

  return (
    <ul className={classes.response}>
      {ansitems.map((item) => (
        <SingleAnswer key={item._id} data={item}></SingleAnswer>
      ))}
    </ul>
  );
}

export default AnswerList;


