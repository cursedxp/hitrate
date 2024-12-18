import Image from "next/image";

export default function ChromeExtension() {
  return (
    <div
      className="flex flex-row-reverse items-center gap-4 justify-center w-full mb-16"
      id="chrome-extension"
    >
      {/* Right side with content (now first in order) */}
      <div className="w-[60%]">
        <div
          className="grid-item relative rounded-2xl bg-white transition-all duration-300 flex flex-col justify-center gap-4"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src="/chrome-extension-preview.png"
              alt="Chrome Extension Preview"
              fill
              quality={100}
              loading="lazy"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Left side with text content (now second in order) */}
      <div className="flex flex-col w-[40%] self-start">
        <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
          EXTENSION
        </div>
        <div className="text-4xl font-bold text-black mb-4">
          Download & Save YouTube Thumbnails
        </div>
        <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
          Download thumbnails for free or save them to your collections with a
          Pro subscription
        </p>

        {/* Features list */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-gray-900">Free Download</h3>
            <p className="text-base text-gray-500">
              Download any YouTube thumbnail instantly to your device -
              available for all users.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-gray-900">
              Pro: Save to Collections
            </h3>
            <p className="text-base text-gray-500">
              Pro users can save thumbnails directly to their HitMagnet
              collections for better organization.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-gray-900">
              Pro: Advanced Features
            </h3>
            <p className="text-base text-gray-500">
              Get unlimited storage, custom collections, tags, and instant
              syncing across all devices.
            </p>
          </div>
        </div>

        {/* CTA */}
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl text-white bg-zinc-800 hover:bg-zinc-700 w-fit"
        >
          Add to Chrome - It&apos;s Free
        </a>
        <p className="mt-3 text-sm text-gray-500">
          Available for Chrome, Firefox, and Edge browsers
        </p>
      </div>
    </div>
  );
}
