function Finish({ dispatch, points, total_points }) {
  return (
    <>
      <p className="result">
        You scored {points} out of {total_points} ({Math.floor((points / total_points)*100)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart quiz
      </button>
    </>
  );
}

export default Finish
