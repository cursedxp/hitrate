export default function Loader({ text }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex space-x-2 mb-2">
        <div className="w-2 h-2 bg-black rounded-full animate-pulse dark:bg-white"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-150 dark:bg-white"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-300 dark:bg-white"></div>
      </div>
      {text && <div className="text-sm text-black dark:text-white">{text}</div>}
    </div>
  );
}
