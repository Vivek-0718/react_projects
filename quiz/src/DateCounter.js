import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + 1 * state.step };
      break;
    case "dec":
      return {
        ...state,
        count: state.count - 1 * state.step,
      };
      break;
    case "inputChange":
      return { ...state, count: action.payload };
      break;
    case "setStep":
      return { ...state, step: action.payload };
      break;
    case "reset":
      return initialState;
      break;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const date = new Date("june 21 2027");
  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: Number(e.target.value) })
          }
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={state.count}
          onChange={(e) =>
            dispatch({
              type: "inputChange",
              payload: Number(e.target.value),
            })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
