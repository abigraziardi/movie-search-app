import { useEffect, useState } from "react";
import { APP_KEY, TOP_RATED_IDS } from "./API/constants";
import Loader from "./components/Handler/Loader";
import ErrorMessage from "./components/Handler/ErrorMessage";
import Header from "./components/Header";
import Search from "./components/Search";
import Main from "./components/Main/Main";
import MovieList from "./components/Main/MovieList";
import MovieDetails from "./components/Main/MovieDetails";
import Footer from "./components/Footer";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectMovieId(id) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");

        if (query.trim().length < 3) {
          const res = TOP_RATED_IDS.map((id) =>
            fetch(`https://www.omdbapi.com/?apikey=${APP_KEY}&i=${id}`, {
              signal: controller.signal,
            }).then((topmovie) => topmovie.json()),
          );
          const data = await Promise.all(res);

          const checkError = data.find((item) => item.Response === "False");
          if (checkError) throw new Error(checkError.Error);

          setMovies(data);
        } else {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${APP_KEY}&s=${query}`,
            { signal: controller.signal },
          );
          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);

          setMovies(data.Search);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Header onDefaultQuery={setQuery} onCloseMovie={handleCloseMovie} />

      {!selectedMovieId && <Search onSearch={setQuery} />}

      <Main>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!isLoading &&
          !error &&
          (selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <MovieList
                movies={movies}
                onSelectMovieId={handleSelectMovieId}
              />
            </>
          ))}
      </Main>

      <Footer />
    </div>
  );
}
