import { useData } from "./context/quizprovider";

function Finish() {
  const { questions, dispatch, points } = useData();
  const total_points = questions.reduce((agg, val) => {
    return agg + val.points;
  }, 0);
  return (
    <>
      <p className="result">
        You scored {points} out of {total_points} ({Math.floor((points / total_points)*100)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart quiz
      </button>
    </>
  );
}

export default Finish
