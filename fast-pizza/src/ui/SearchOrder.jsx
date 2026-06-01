import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setquery] = useState("");
  const nav = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    nav(`/order/${query}`);
    setquery("")
  }

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        type="text"
        value={query}
        placeholder="Search order"
        onChange={(e) => setquery(e.target.value)}
      />
      {/* <button type="submit">Search</button> */}
    </form>
  );
}

export default SearchOrder;
