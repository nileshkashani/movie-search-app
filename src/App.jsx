import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async () => {
    setHasSearched(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=e76f4147`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700">
          Movie Search App
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <input
          type="text"
          placeholder="Enter movie name"
          className="text-lg sm:text-2xl w-full sm:w-[300px] px-4 py-2 border-2 border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={!query.trim()}
          className="bg-blue-600 text-white text-lg sm:text-2xl px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={searchMovies}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x445.png?text=No+Image"
                }
                alt={movie.Title}
                className="w-48 h-72 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3 text-center">
                {movie.Title}
              </h2>
              <p className="text-gray-500">Year: {movie.Year}</p>
            </div>
          ))
        ) : hasSearched ? (
          <p className="text-center col-span-full text-red-500 text-xl font-medium">
            No results found for "{query}"
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
