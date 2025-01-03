import Image from "next/image";

export default function ChromeExtension() {
  return (
    <div
      className="flex flex-col-reverse md:flex-row-reverse items-center gap-4 justify-center w-full mb-16 px-4 md:px-0"
      id="chrome-extension"
    >
      {/* Image section */}
      <div className="w-full md:w-[60%]">
        <div
          className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col justify-center gap-4"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div className="relative h-[300px] md:h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/extension.png"
              alt="Chrome Extension Preview"
              fill
              quality={100}
              loading="lazy"
              className="object-contain md:object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw"
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-col w-full md:w-[40%] self-start mb-8 md:mb-0">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          EXTENSION
        </div>
        <div className="text-3xl md:text-4xl font-bold text-black mb-4">
          Create Collections of YouTube Thumbnails
        </div>
        <p className="text-base md:text-xl text-zinc-500 mb-8 leading-relaxed">
          Create thumbnail collections directly on HitMagnet.
        </p>

        {/* Features list */}
        <div className="space-y-4 md:space-y-6 mb-8">
          <div className="flex flex-col">
            <h3 className="text-base md:text-lg font-medium text-gray-900">
              Create Collections
            </h3>
            <p className="text-sm md:text-base text-gray-500">
              Save YouTube thumbnails directly to your HitMagnet collections
              with one click. Organize and categorize thumbnails from successful
              videos to study what works and get inspiration for your own
              content. Perfect for researching your niche and tracking
              competitor strategies.
            </p>
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://chrome.google.com/webstore/detail/poifjopaeakiakblodnmnbhanlphffmb"
          className="inline-flex items-center px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-xl text-white bg-zinc-800 hover:bg-zinc-700 w-fit"
        >
          Add to Chrome - It&apos;s Free
        </a>
        <p className="mt-3 text-xs md:text-sm text-gray-500">
          Available for Chrome
        </p>
      </div>
    </div>
  );
}
