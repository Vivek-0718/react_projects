import { useEffect } from "react";
function Footer({
  clickedOption,
  dispatch,
  total,
  currentQuestion,
  secondsRemaining,
}) {
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
        (currentQuestion < total ? (
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
