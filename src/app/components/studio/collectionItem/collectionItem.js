import Image from "next/image";
export default function CollectionItem({ collection }) {
  return (
    <div key={collection.id} className="flex flex-col">
      {/* Main large image */}
      <div className="aspect-[16/10] relative rounded-lg overflow-hidden bg-gray-100 mb-2">
        {collection.thumbnails[0]?.url ? (
          <Image
            src={collection.thumbnails[0].url}
            alt={collection.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="aspect-[16/10] relative rounded-lg overflow-hidden bg-gray-100"
          >
            {collection.thumbnails[index]?.url ? (
              <Image
                src={collection.thumbnails[index].url}
                alt={`${collection.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between space-y-1 ">
        <h3 className="font-semibold text-lg">{collection.name}</h3>
        <p className="text-sm text-gray-500">
          {collection.thumbnails.length || 0} Items
        </p>
      </div>
    </div>
  );
}
