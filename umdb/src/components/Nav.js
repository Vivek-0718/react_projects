import { useEffect, useRef } from "react";

export default function Nav({ children, searchValue, handleSearch }) {
  const inputElement = useRef(null)
  useEffect(function () {
    inputElement.current.focus()
  }, [])
  useEffect(function () {
    function callback(e) {
      if (e.key === "Enter") {
        inputElement.current.focus();
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      return document.removeEventListener("keydown", callback);
    }
  },[])
  return (
    <nav className="nav-bar">
      <div className="logo">
        <h1>UMDb</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        ref={inputElement}
      />
      <p className="num-results">{children} results</p>
    </nav>
  );
}
