export default function Navigation({ isActive, setIsActive }) {
  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex mt-4 space-x-4">
        {["Projects", "Collections"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`bg-zinc-100 px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-zinc-200 ${
                isActive === item ? "bg-zinc-200" : ""
              }`}
              onClick={() => setIsActive(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
