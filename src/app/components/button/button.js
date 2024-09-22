export default function Button({ children, onClick, className }) {
  return (
    <button
      className={`p-2 rounded-md dark:bg-zinc-800 hover:bg-zinc-100 hover:dark:bg-zinc-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
