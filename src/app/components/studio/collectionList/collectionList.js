import { useState, useEffect } from "react";
import CollectionItem from "../collectionItem/collectionItem";
import CollectionContent from "../../collectionContent/collectionContent";
import Loader from "../../loader/loader";

export default function CollectionList({ session }) {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/collections/read");
      if (!response.ok) throw new Error("Failed to fetch collections");
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };

  const handleCollectionDelete = async (collectionId) => {
    setCollections(
      collections.filter((collection) => collection.id !== collectionId)
    );
    await fetchCollections();
  };

  const handleBack = () => {
    setSelectedCollection(null);
    fetchCollections();
  };

  const handleUpdate = (updatedCollection) => {
    setCollections(
      collections.map((collection) =>
        collection.id === updatedCollection.id ? updatedCollection : collection
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (selectedCollection) {
    return (
      <CollectionContent
        collection={selectedCollection}
        onBack={handleBack}
        onUpdate={handleUpdate}
      />
    );
  }

  return (
    <section className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            onClick={() => handleCollectionClick(collection)}
            onDelete={handleCollectionDelete}
          />
        ))}
      </div>
    </section>
  );
}
