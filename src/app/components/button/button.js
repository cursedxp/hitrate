export default function Button({ children, onClick, className }) {
  return (
    <button
      className={`p-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-200 hover:dark:bg-zinc-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
