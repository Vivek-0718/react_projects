function Question({ questions, dispatch, currentQuestion, clickedOption }) {
  const q = questions[currentQuestion - 1];
  const hasAnswered = clickedOption !== null;
  return (
    <>
      {
        <div className="question" key={q.id}>
          <h4>{q.question}</h4>
          <div className="options">
            {q.options.map((o, i) => {
              return (
                <button
                  className={`btn btn-option ${hasAnswered && clickedOption === i ? "answer" : ""}
                  ${
                    hasAnswered
                      ? i === q.correctOption
                        ? "correct"
                        : "wrong"
                      : ""
                  }`}
                  disabled={hasAnswered}
                  key={i}
                  onClick={() =>
                    dispatch({
                      type: "clicked",
                      payload: i,
                      points: i === q.correctOption ? q.points : 0,
                    })
                  }
                >
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}

export default Question;
