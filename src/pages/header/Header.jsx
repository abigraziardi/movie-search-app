export default function Header({ onDefaultQuery, onCloseMovie }) {
  function handleDefault() {
    onCloseMovie();
    onDefaultQuery("");
  }

  return (
    <header className="bg-slate-800 text-2xl font-bold text-white p-4 text-center">
      <button className="cursor-pointer" onClick={handleDefault}>
        Movies Search App 🎬
      </button>
    </header>
  );
}
