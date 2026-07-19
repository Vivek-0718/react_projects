import { useData } from "./context/quizprovider";

function Start() {
  const {
    dispatch,
    questions
  } = useData();
  return (
    <div className="start">
      <h2>Welcome to The Quiz!</h2>
      <h3>{questions.length} questions to test your General Knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startGame" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default Start
