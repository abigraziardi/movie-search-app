import { useState } from "react";

export default function Search({ onSearch }) {
  const [tempQuery, setTempQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!tempQuery.trim()) return;
    onSearch(tempQuery);
  }

  return (
    <div className="bg-slate-800 flex items-center justify-center p-4">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={tempQuery}
          onChange={(e) => setTempQuery(e.target.value)}
          className="bg-slate-600/30 w-70 border border-sky-700 rounded-full px-3 py-1 shadow-lg placeholder:text-slate-400 text-slate-50"
        />
      </form>
    </div>
  );
}
