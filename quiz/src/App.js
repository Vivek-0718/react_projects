import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Quiz from "./Quiz";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import Finish from "./Finish";

const secs_per_ques = 30
const initialValue = {
  status: "ready",
  questions: [],
  currentQuestion: 0,
  clickedOption: null,
  points: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        status: "active",
        currentQuestion: 1,
        secondsRemaining: state.questions.length * secs_per_ques,
      };
    case "loading":
      return { ...state, status: "loading" };
    case "error":
      return { ...state, status: "error" };
    case "ready":
      return { ...state, status: "ready" };
    case "finish":
      return { ...state, status: "finish" };
    case "restart":
      return {
        ...initialValue,
        questions: state.questions,
      };
    case "questions":
      return { ...state, questions: action.payload };
    case "clicked":
      return {
        ...state,
        clickedOption: action.payload,
        points: state.points + action.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        clickedOption: null,
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const {
    status,
    questions,
    currentQuestion,
    clickedOption,
    points,
    secondsRemaining,
  } = state;
  const total_points = questions.reduce((agg, val) => {
    return agg + val.points;
  }, 0);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          dispatch({ type: "loading" });
          let res = await fetch(`/api/questions`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          let data = await res.json();
          dispatch({ type: "questions", payload: data.questions });
          dispatch({ type: "ready" });
        } catch (e) {
          if (e.name !== "AbortError") {
            console.error("Error:", e.message);
            dispatch({ type: "error" });
          }
        }
      }
      fetchData();
      return () => {
        controller.abort();
      };
    },
    [dispatch],
  );
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && (
          <Start dispatch={dispatch} total={questions.length}></Start>
        )}
        {status === "active" && (
          <Quiz>
            <Progress
              currentQuestion={currentQuestion}
              questions={questions}
              points={points}
              total_points={total_points}
            ></Progress>
            <Question
              questions={questions}
              dispatch={dispatch}
              currentQuestion={currentQuestion}
              clickedOption={clickedOption}
            ></Question>
            <Footer
              currentQuestion={currentQuestion}
              clickedOption={clickedOption}
              dispatch={dispatch}
              total={questions.length}
              secondsRemaining={secondsRemaining}
            ></Footer>
          </Quiz>
        )}
        {status === "finish" && (
          <Finish
            dispatch={dispatch}
            points={points}
            total_points={total_points}
          ></Finish>
        )}
      </Main>
    </div>
  );
}
