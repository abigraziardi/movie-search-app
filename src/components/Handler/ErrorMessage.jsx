export default function ErrorMessage({ message }) {
  return (
    <div className="text-center text-lg p-20">
      <span>⛔</span> {message}
    </div>
  );
}
