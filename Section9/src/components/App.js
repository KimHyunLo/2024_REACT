import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import NumResults from "./NumResults";
import Logo from "./Logo";
import Search from "./Search";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import StarRating from "./StarRating";

const KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGE4Y2EzOTlmZjM0ZjY3ODMxZGE0Yjg1ZmE4OGRjNyIsInN1YiI6IjYzMmZmYTJlNmY2YTk5MDA3Yjk1YzkyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtQ45ug9y1sPeKtbzhBIA7o1ftcR-pBltzqgyXIhZoo";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((curr) => (curr === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleUpdateWatched(id, rating) {
    setWatched((watched) => {
      return watched.map((el) =>
        el.id === id
          ? {
              ...el,
              userRating: rating,
            }
          : el
      );
    });
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((el) => el.id !== id));
  }

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

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onUpdateWatched={handleUpdateWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚨</span> {message}
    </p>
  );
}

function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
  onUpdateWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const {
    title,
    release_date: released,
    poster_path: poster,
    runtime,
    popularity: imdbRating,
    overview: plot,
    genres,
  } = movie;

  function handleAdd() {
    if (isAdded) {
      onUpdateWatched(selectedId, userRating);
    } else {
      const newWatchedMovie = {
        id: selectedId,
        title,
        year: released,
        poster,
        imdbRating,
        userRating,
        runtime,
      };

      onAddWatched(newWatchedMovie);
    }

    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedId}`,
          {
            headers: {
              Authorization: KEY,
              accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();

      const filtered = watched.filter((el) => el.id === selectedId);
      if (filtered.length) {
        setUserRating(filtered[0].userRating);
        setIsAdded(true);
      } else {
        setUserRating(0);
      }
    },
    [selectedId, watched]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={"https://image.tmdb.org/t/p/original" + poster}
              alt={`Poster of ${title} movie`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime + " min"}
              </p>
              <p>{genres && genres[0].name}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} TMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={20}
                onSetRating={setUserRating}
                defaultRating={userRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  {isAdded ? "Edit Ratings" : "+ Add to list"}
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
