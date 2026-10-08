import { useEffect, useState } from "react";
import { APP_KEY } from "../../API/constants";
import Loader from "../Handler/Loader";

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Released: released,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Genre: genre,
    Actors: actors,
    Director: director,
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APP_KEY}&i=${selectedId}`,
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" flex flex-col items-center justify-center md:flex-row md:w-5xl md:mx-auto md:p-5">
          <header className="w-full md:w-2xl">
            <button
              onClick={onCloseMovie}
              className="bg-slate-600/70 rounded-full p-5 w-23 scale-50 flex justify-center items-center ml-auto cursor-pointer shadow-lg text-red-500 hover:bg-slate-700/70 hover:text-red-600 md:-ml-5 "
            >
              <span className="text-5xl font-bold mb-1">&#x2715;</span>
            </button>

            <img
              src={poster}
              alt={`${title} poster`}
              className="mx-auto w-75 rounded-xl hover:scale-105 transition-transform md:w-80"
            />
          </header>

          <div>
            <div className="mt-4 text-slate-50 md:mt-0">
              <h2 className="text-center text-xl font-semibold md:text-2xl md:text-left md:mx-5">
                {title}
              </h2>
              <div className="flex justify-center gap-10 mt-3 font-medium md:text-lg md:justify-start md:mx-5">
                <p>
                  <span>📅</span>
                  <span>{released}</span>
                </p>
                <p>
                  <span>⌛</span>
                  <span>{runtime}</span>
                </p>
                <p>
                  <span>⭐</span>
                  <span>{imdbRating}</span>
                </p>
              </div>
            </div>

            <section className="p-4 flex flex-col gap-2 text-slate-50 md:text-lg">
              <p className="mb-5 mt-3">
                <em>{plot}</em>
              </p>
              <p className="font-semibold">
                Genre: <span className="font-normal">{genre}</span>
              </p>
              <p className="font-semibold">
                Starring: <span className="font-normal">{actors}</span>
              </p>
              <p className="font-semibold">
                Directed by: <span className="font-normal">{director}</span>
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
