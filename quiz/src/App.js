import { useEffect } from "react";
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
import { useData } from "./context/quizprovider";
export default function App() {
  const {
    dispatch,
    status,
  } = useData();
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
        {status === "ready" && <Start></Start>}
        {status === "active" && (
          <Quiz>
            <Progress></Progress>
            <Question></Question>
            <Footer></Footer>
          </Quiz>
        )}
        {status === "finish" && <Finish></Finish>}
      </Main>
    </div>
  );
}
