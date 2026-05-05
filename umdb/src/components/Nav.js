
export default function Nav({ children, searchValue, handleSearch }) {
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
      />
      <p className="num-results">{children} results</p>
    </nav>
  );
}
