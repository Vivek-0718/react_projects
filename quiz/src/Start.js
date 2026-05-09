function Start({ dispatch, total }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{total} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({type:"startGame"})}>
        Let's start
      </button>
    </div>
  );
}

export default Start
