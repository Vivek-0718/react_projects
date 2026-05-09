function Footer({
  clickedOption,
  dispatch,
  total,
  currentQuestion,
}) {
  return (
    <div className="footer">
      <div className="timer">10:00</div>
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
