import { useData } from "./context/quizprovider";

function Progress() {
  const {
    questions,
    currentQuestion,
    points,
  } = useData();
   const total_points = questions.reduce((agg, val) => {
     return agg + val.points;
   }, 0);
  return (
    <header className="progress">
      <progress max={questions.length} value={currentQuestion}></progress>
      <p>
        Question <strong>{currentQuestion}</strong> / {questions.length}
      </p>
      <p>
        {points} / {total_points}
      </p>
    </header>
  );
}

export default Progress;
