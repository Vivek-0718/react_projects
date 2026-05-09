function Question({ questions, dispatch, currentQuestion, clickedOption }) {
  const q = questions[currentQuestion - 1];
  const hasAnswered = clickedOption !==null
  return (
    <>
      {
        <div className="question" key={q.id}>
          <h4>{q.question}</h4>
          <div className="options">
            {q.options.map((o, i) => {
              return (
                <button
                  disabled={clickedOption !== null}
                  className={`btn btn-option ${i === clickedOption ? "answer" : ""} ${i === q.correctOption && hasAnswered && "correct"} ${i !== q.correctOption && hasAnswered && "wrong"}`}
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
