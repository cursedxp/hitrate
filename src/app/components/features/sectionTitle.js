export default function SectionTitle({ title, description, paragraphStyle }) {
  return (
    <div className="text-center w-full flex flex-col items-center mb-16">
      <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 md:px-4">
        {title}
      </h1>
      <p
        className={`text-xl md:text-xl sm:text-lg text-gray-500 text-center p-4 ${paragraphStyle}`}
      >
        {description}
      </p>
    </div>
  );
}
