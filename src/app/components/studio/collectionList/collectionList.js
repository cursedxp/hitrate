import { useFetchCollections } from "@/app/hooks/useFetchCollections";
import CollectionItem from "@/app/components/studio/collectionItem/collectionItem";

export default function CollectionList({ session }) {
  const { loading, collections, refresh } = useFetchCollections();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
      {collections.map((collection) => (
        <CollectionItem collection={collection} />
      ))}
    </section>
  );
}
