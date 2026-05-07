import { useEffect, useRef } from "react";
import { useKeys } from "../hooks/useKeys";
export default function Nav({ children, searchValue, handleSearch }) {
  const inputElement = useRef(null);
  useEffect(function () {
    inputElement.current.focus();
  }, []);
  useKeys("Enter", () => {
    inputElement.current.focus();
  });
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
