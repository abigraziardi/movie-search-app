export default function Main({ children }) {
  return (
    <div className="flex-1 flex flex-col bg-linear-to-b from-sky-950 to-slate-950">
      {children}
    </div>
  );
}
