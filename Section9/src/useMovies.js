import { useState, useEffect } from "react";

const KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGE4Y2EzOTlmZjM0ZjY3ODMxZGE0Yjg1ZmE4OGRjNyIsInN1YiI6IjYzMmZmYTJlNmY2YTk5MDA3Yjk1YzkyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtQ45ug9y1sPeKtbzhBIA7o1ftcR-pBltzqgyXIhZoo";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            {
              signal: controller.signal,
              headers: {
                Authorization: KEY,
                accept: "application/json",
              },
            }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching moview");

          const data = await res.json();

          if (data.total_results === 0 || data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.results);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
