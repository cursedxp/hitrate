export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-black rounded-full animate-pulse dark:bg-white"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-150 dark:bg-white"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-300 dark:bg-white"></div>
      </div>
    </div>
  );
}
