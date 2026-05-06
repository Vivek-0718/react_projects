import { useEffect, useState } from "react";
import Loader from "./../components/Loader.js";
import StarRating from "./../components/StarRating.js";

const average = (arr) => arr.reduce((acc, cur, i) => acc + cur / arr.length, 0);
export default function Main({
  movies,
  isLoading,
  error,
  selectedID,
  watched,
  isalreadyWatched,
  handleSelectedID,
  handleBackFromSelectedID,
  handleAddWatchedList,
  removeFromWatchedList,
}) {
  return (
    <div className="main">
      <SearchBox
        movies={movies}
        isLoading={isLoading}
        error={error}
        handleSelectedID={handleSelectedID}
      />
      <WatchedBox
        isalreadyWatched={isalreadyWatched}
        selectedID={selectedID}
        watched={watched}
        handleBackFromSelectedID={handleBackFromSelectedID}
        handleAddWatchedList={handleAddWatchedList}
        removeFromWatchedList={removeFromWatchedList}
      />
    </div>
  );
}

function SearchBox({ movies, isLoading, error, handleSelectedID }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box searchlist">
      <ToggleButton onToggle={setIsOpen} isOpen={isOpen} />
      {isOpen ? (
        <>
          {!isLoading && !error && (
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <SearchListItem
                  movie={movie}
                  key={movie.imdbID}
                  handleSelectedID={handleSelectedID}
                />
              ))}
            </ul>
          )}
          {isLoading && (
            <Loader text="Loading..." variant="solid" accentColor="#6741d9" />
          )}
          {error && (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "1.6rem",
              }}
            >
              {error}
            </p>
          )}
        </>
      ) : (
        <p
          style={{
            fontSize: "1.6rem",
            padding: "5rem",
            textAlign: "center",
          }}
        >
          Yes, the toggle is working.
        </p>
      )}
    </div>
  );
}

function WatchedBox({
  selectedID,
  watched,
  handleBackFromSelectedID,
  handleAddWatchedList,
  isalreadyWatched,
  removeFromWatchedList,
}) {
  return (
    <div className="box">
      {selectedID ? (
        <SelectedMovie
          isalreadyWatched={isalreadyWatched}
          selectedID={selectedID}
          handleBackFromSelectedID={handleBackFromSelectedID}
          handleAddWatchedList={handleAddWatchedList}
          watched={watched}
        />
      ) : (
        <>
          <Summary watched={watched} />
          {watched.length ? (
            <ul className="list">
              {watched.map((watchedMovie) => (
                <WatchedListItem
                  watchedMovie={watchedMovie}
                  key={watchedMovie.imdbID}
                  removeFromWatchedList={removeFromWatchedList}
                />
              ))}
            </ul>
          ) : (
            <p
              style={{
                fontSize: "1.6rem",
                padding: "5rem",
                textAlign: "center",
              }}
            >
              No movies added. Pick a movie from the list to get started
            </p>
          )}
        </>
      )}
    </div>
  );
}

function ToggleButton({ isOpen, onToggle }) {
  return (
    <button className="btn-toggle" onClick={() => onToggle((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
function SearchListItem({ movie, handleSelectedID }) {
  return (
    <li onClick={() => handleSelectedID(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Your average</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Math.round(avgImdbRating * 100) / 100}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.round(avgUserRating * 100) / 100}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.round(avgRuntime * 100) / 100} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedListItem({ watchedMovie, removeFromWatchedList }) {
  return (
    <li key={watchedMovie.imdbID}>
      <img src={watchedMovie.Poster} alt={`${watchedMovie.Title} poster`} />
      <h3>{watchedMovie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{watchedMovie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{watchedMovie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchedMovie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => removeFromWatchedList(watchedMovie.imdbID)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14px"
          height="14px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill=""
          />
        </svg>
      </button>
    </li>
  );
}

function SelectedMovie({
  selectedID,
  handleBackFromSelectedID,
  handleAddWatchedList,
  isalreadyWatched,
  watched,
}) {
  let [selectedMovieDetails, getSelectedMovieDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [stars, setStars] = useState(0);
  function handleStarRating(v) {
    setStars(v);
  }
  function handleAddToWatchList() {
    let watchedMovie = {
      imdbID: selectedMovieDetails.imdbID,
      Title: selectedMovieDetails.Title,
      Year: selectedMovieDetails.Year,
      Poster: selectedMovieDetails.Poster,
      runtime: Number(selectedMovieDetails.Runtime.split(" ")[0]),
      imdbRating: selectedMovieDetails.imdbRating,
      userRating: stars,
    };
    handleBackFromSelectedID();
    handleAddWatchedList(watchedMovie);
  }

  useEffect(
    function () {
      function handleEsc(e) {
        if (e.code === "Escape") handleBackFromSelectedID();
      }
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    },
    [handleBackFromSelectedID],
  );
  useEffect(
    function () {
      async function getSelectedMovie() {
        try {
          setLoading(true);
          setError("");
          let res = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${selectedID}`,
          );
          if (!res.ok) throw new Error("Network error. Please try again later");
          let data = await res.json();
          if (data.Response === "False")
            throw new Error(data.Error || "Movie not found");
          getSelectedMovieDetails(data);
          setError("");
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }
      getSelectedMovie();
    },
    [selectedID],
  );

  return (
    <>
      {isLoading && (
        <Loader
          className="loader"
          text="Loading..."
          variant="solid"
          accentColor="#6741d9"
        />
      )}

      {error && <p className="error">⚠️ {error}</p>}

      {!isLoading && !error && selectedMovieDetails && (
        <div className="details">
          <button
            className="btn-back"
            onClick={() => handleBackFromSelectedID()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#0F1729"
              />
            </svg>
          </button>
          <header>
            <img
              src={selectedMovieDetails.Poster}
              alt={`${selectedMovieDetails.Title} Poster`}
            />
            <div className="details-overview">
              <h2>{selectedMovieDetails.Title}</h2>
              <p>
                {selectedMovieDetails.Released} • {selectedMovieDetails.Runtime}
              </p>
              <p>{selectedMovieDetails.Genre}</p>
              <p>
                <span>⭐️</span>
                {selectedMovieDetails.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isalreadyWatched ? (
                <p>
                  You rated with movie{" "}
                  {watched.find((i) => i.imdbID === selectedID)?.userRating} ⭐️
                </p>
              ) : (
                <>
                  <StarRating size={24} outerStateSetter={handleStarRating} />
                  {stars ? (
                    <button
                      className="btn-add"
                      onClick={() => handleAddToWatchList()}
                    >
                      Add to list
                    </button>
                  ) : null}
                </>
              )}
            </div>
            <p>
              <em>{selectedMovieDetails.Plot}</em>
            </p>
            <p>Starring: {selectedMovieDetails.Actors}</p>
            <p>
              Directed by <strong>{selectedMovieDetails.Director}</strong>
            </p>
          </section>
        </div>
      )}
    </>
  );
}
