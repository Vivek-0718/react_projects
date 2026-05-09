function Progress({ currentQuestion, questions, points, total_points }) {
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
