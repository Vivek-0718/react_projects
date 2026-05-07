import { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import { useLocalStorage } from "../hooks/useLocalStorage";

const POPULAR_IDS = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather Part II
  "tt0468569", // The Dark Knight
  "tt1375666", // Inception
  "tt0816692", // Interstellar
  "tt0109830", // Forrest Gump
  "tt0137523", // Fight Club
  "tt0120737", // The Lord of the Rings
  "tt0167260", // Return of the King
  "tt0080684", // The Empire Strikes Back
  "tt0133093", // The Matrix
];
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchValue, setsearchValue] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const [watched, setWatched] = useLocalStorage("watch", []);
  const isalreadyWatched = watched.some((i) => i.imdbID === selectedID);

  function handleAddWatchedList(movie) {
    setWatched((list) => [...list, movie]);
  }
  function removeFromWatchedList(movieID) {
    setWatched((pre) => pre.filter((m) => movieID !== m.imdbID));
  }
  function handleSelectedID(id) {
    setSelectedID(id);
  }
  function handleBackFromSelectedID() {
    setSelectedID(null);
  }
  function handleSearch(e) {
    setsearchValue(e);
  }

  useEffect(() => {
    async function loadPopular() {
      try {
        setLoading(true);
        const results = await Promise.all(
          POPULAR_IDS.map((id) =>
            fetch(
              `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${id}&plot=short`,
            ).then((r) => r.json()),
          ),
        );
        const validMovies = results.filter((m) => m.Response === "True");
        setMovies(validMovies);
      } catch (err) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }
    if (searchValue === "") {
      loadPopular();
    }
  }, [searchValue]);

  const SelectedTitle = movies.find((m) => m.imdbID === selectedID)?.Title;
  useEffect(
    function documentTitle() {
      if (SelectedTitle) {
        document.title = SelectedTitle;
      }
      return () => {
        document.title = "UMDb";
      };
    },
    [selectedID, SelectedTitle],
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          let res = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${searchValue}`,
            { signal: controller.signal },
          );
          if (!res.ok)
            throw new Error("Something wrong. Please try again later");

          let data = await res.json();

          if (data.Response === "False") throw new Error("No results");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
          setMovies([]);
        } finally {
          setLoading(false);
        }
      }
      if (!searchValue) {
        setMovies([]);
        setError("");
        handleBackFromSelectedID();
        return;
      }

      const timer = setTimeout(() => fetchMovies(), 400);
      return () => {
        controller.abort();
        clearTimeout(timer);
      };
    },
    [searchValue],
  );
  return (
    <>
      <Nav searchValue={searchValue} handleSearch={handleSearch}>
        <strong>{movies.length > 0 ? `${movies.length}` : "0"}</strong>
      </Nav>

      <Main
        movies={movies}
        isLoading={isLoading}
        error={error}
        selectedID={selectedID}
        watched={watched}
        isalreadyWatched={isalreadyWatched}
        handleSelectedID={handleSelectedID}
        handleBackFromSelectedID={handleBackFromSelectedID}
        handleAddWatchedList={handleAddWatchedList}
        removeFromWatchedList={removeFromWatchedList}
      ></Main>
    </>
  );
}
