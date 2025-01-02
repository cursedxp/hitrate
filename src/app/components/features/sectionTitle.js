export default function SectionTitle({ title, description, paragraphStyle }) {
  return (
    <div className="text-center w-full flex flex-col items-center mb-16">
      <h1 className="lg:text-7xl md:text-5xl sm:text-5xl font-bold text-center mb-6 max-w-3xl">
        {title}
      </h1>
      <p
        className={`text-xl md:text-lg text-gray-500 text-center ${paragraphStyle}`}
      >
        {description}
      </p>
    </div>
  );
}
