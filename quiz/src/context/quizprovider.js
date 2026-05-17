import { createContext, useContext, useReducer } from "react";

const quizContext = createContext();
const secs_per_ques = 30;
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
function QuizProvider({ children }) {
  const [
    {
      status,
      questions,
      currentQuestion,
      clickedOption,
      points,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialValue);
  return (
    <quizContext.Provider
      value={
        {status,
        questions,
        currentQuestion,
        clickedOption,
        points,
        secondsRemaining,
        dispatch}
      }
    >
      {children}
    </quizContext.Provider>
  );
}

function useData() {
  const context = useContext(quizContext);
  if (context === undefined) throw new Error("Error");
  return context;
}

export { QuizProvider, useData };
