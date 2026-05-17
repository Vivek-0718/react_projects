import { useEffect } from "react";
import { useData } from "./context/quizprovider";
function Footer() {
  const { questions,currentQuestion, dispatch, clickedOption, secondsRemaining } = useData();
  const mins = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
  const secs = String(secondsRemaining % 60).padStart(2, "0");
  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);
      if (secondsRemaining < 0) {
        clearInterval(timer);
        dispatch({ type: "finish" });
      }
      return () => clearInterval(timer);
    },
    [dispatch, secondsRemaining],
  );
  return (
    <div className="footer">
      <div className="timer">{`${mins}:${secs}`}</div>
      {clickedOption !== null &&
        (currentQuestion < questions.length ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
          >
            Finish
          </button>
        ))}
    </div>
  );
}

export default Footer;
