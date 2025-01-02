import Image from "next/image";
import SectionTitle from "@/app/components/features/sectionTitle";

export default function Previews() {
  const previewVideos = [
    {
      id: 4,
      title: "Your video title goes here",
      channel: "Channel Name",
      preview: "/images/channels/previews/4.jpg",
      views: "45K views",
      avatar: "",
      published: "3 hours ago",
    },
    {
      id: 2,
      title: "AI is ruining the internet",
      channel: "Tech Talk",
      avatar: "/images/channels/avatars/2.png",
      preview: "/images/channels/previews/2.png",
      views: "892K views",
      published: "1 week ago",
    },
    {
      id: 1,
      title: "Pro Gamers Face Off in an Unforgettable Match!",
      channel: "Pixel Warriors",
      avatar: "/images/channels/avatars/1.png",
      preview: "/images/channels/previews/1.png",
      views: "14M views",
      published: "2 days ago",
    },
    {
      id: 3,
      title: "Genius Life Hacks to Simplify Your Day!",
      channel: "Hack It Easy",
      avatar: "/images/channels/avatars/3.png",
      preview: "/images/channels/previews/3.png",
      views: "203K views",
      published: "5 days ago",
    },
    {
      id: 5,
      title: "A Couple’s Journey to Hidden Gems",
      channel: "Oma The Traveler",
      avatar: "/images/channels/avatars/5.png",
      preview: "/images/channels/previews/5.png",
      views: "1.2M views",
      published: "12 hours ago",
    },
    {
      id: 6,
      title: "Gentle Yoga Flow for Relaxation and Peace",
      channel: "Serenity Stretch",
      avatar: "/images/channels/avatars/6.png",
      preview: "/images/channels/previews/6.png",
      views: "456K views",
      published: "1 day ago",
    },
  ];

  return (
    <section
      id="features"
      className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-16 md:mb-32 px-4 md:px-0"
    >
      <SectionTitle
        title="Quickly preview thumbnails and titles."
        description="Preview your thumbnails and titles across multiple YouTube formats - home feed, search results, and suggested videos. See your content through your viewers' eyes."
        paragraphStyle="px-4 md:px-40"
      />
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        <div className="flex flex-col w-full md:w-[40%] self-start mt-10">
          <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
            PREVIEW
          </div>
          <div className="text-3xl md:text-4xl font-bold text-black mb-4">
            Stand out from your competition
          </div>
          <p className=" text-zinc-500 mb-8 leading-relaxed">
            See how your thumbnails and titles compare against your competition.
            Analyze what works in your niche and get inspiration from successful
            creators. Make data-driven decisions to improve your content's
            performance.
          </p>
        </div>
        <div className="w-full md:w-[60%] bg-white rounded-3xl p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {previewVideos.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="aspect-video bg-gray-100 rounded-2xl relative">
                  <Image
                    src={item.preview}
                    alt={`Preview ${item.id}`}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt="Channel avatar"
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-500">{item.channel}</p>
                    <p className="text-[10px] text-gray-500">
                      {item.views} • {item.published}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
