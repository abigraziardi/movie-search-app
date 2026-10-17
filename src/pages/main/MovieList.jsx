import MovieItem from "./MovieItem";

export default function MovieList({ movies, onSelectMovieId }) {
  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap justify-center item gap-4 p-5 md:max-w-5xl">
        {movies?.map((movie, index) => (
          <MovieItem
            key={index}
            movie={movie}
            onSelectMovieId={onSelectMovieId}
          />
        ))}
      </ul>
    </div>
  );
}
