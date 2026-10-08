export default function MovieItem({ movie, onSelectMovieId }) {
  return (
    <li
      key={movie.imdbID}
      onClick={() => onSelectMovieId(movie.imdbID)}
      className="bg-slate-600 w-53 rounded-lg overflow-hidden flex flex-col items-center text-center gap-1 cursor-pointer shadow-2xl hover:scale-105 transition-transform"
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="h-full"
      />
      <div className="w-full p-2 flex flex-col gap-1 text-slate-50">
        <h3 className="truncate w-full font-semibold ">{movie.Title}</h3>
        <span>{movie.Year}</span>
      </div>
    </li>
  );
}
