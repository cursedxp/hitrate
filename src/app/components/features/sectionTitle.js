export default function SectionTitle({ title, description, paragraphStyle }) {
  return (
    <div className="text-center w-full flex flex-col items-center mb-16">
      <h1 className="text-6xl font-bold text-center mb-6 max-w-3xl">{title}</h1>
      <p className={`text-xl text-gray-500 text-center ${paragraphStyle}`}>
        {description}
      </p>
    </div>
  );
}
