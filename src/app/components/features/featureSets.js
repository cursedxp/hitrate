import SectionTitle from "@/app/components/features/sectionTitle";
import SearchResults from "./searchResults";
import ShuffleThumbnails from "./shuffleThumbnails";
import AiTitleGeneration from "./aiTitleGeneration";

export default function FeatureSets() {
  return (
    <section className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-32">
      <SectionTitle
        title="Powerful features to enhance your workflow"
        description="Take advantage of our advanced features designed to make your content creation process smoother and more efficient."
      />
      <SearchResults />
      <ShuffleThumbnails />
      <AiTitleGeneration />
    </section>
  );
}
