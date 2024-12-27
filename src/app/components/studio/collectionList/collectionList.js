import { useState } from "react";
import { useFetchCollections } from "@/app/hooks/useFetchCollections";
import CollectionItem from "@/app/components/studio/collectionItem/collectionItem";
import CollectionContent from "@/app/components/collectionContent/collectionContent";
import Loader from "@/app/components/loader/loader";

export default function CollectionList({ session }) {
  const { loading, collections, refresh } = useFetchCollections();
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };

  const handleCollectionUpdate = (updatedCollection) => {
    // Update the selected collection with new data
    setSelectedCollection(updatedCollection);

    // Update the collections list in memory
    const updatedCollections = collections.map((collection) =>
      collection.id === updatedCollection.id ? updatedCollection : collection
    );

    // Force a refresh of the collections data
    refresh();
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      const response = await fetch(`/api/collections/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete collection");
      }

      refresh();
      setSelectedCollection(null);
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-20">
      {selectedCollection ? (
        <CollectionContent
          collection={selectedCollection}
          onBack={() => {
            setSelectedCollection(null);
            refresh();
          }}
          onUpdate={handleCollectionUpdate}
          onDelete={handleDeleteCollection}
        />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => handleCollectionClick(collection)}
              className="cursor-pointer"
            >
              <CollectionItem collection={collection} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
