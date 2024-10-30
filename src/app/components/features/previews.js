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
      published: "3 hours ago",
    },
    {
      id: 2,
      title: "AI is ruining the internet",
      channel: "Drew Gooden",
      avatar: "/images/channels/avatars/2.jpg",
      preview: "/images/channels/previews/2.jpg",
      views: "892K views",
      published: "1 week ago",
    },
    {
      id: 1,
      title: "100 Identical Twins Fight For $250,000",
      channel: "MrBeast",
      avatar: "/images/channels/avatars/1.jpg",
      preview: "/images/channels/previews/1.jpg",
      views: "14M views",
      published: "2 days ago",
    },
    {
      id: 3,
      title: "Really Good Beef Stew | Kenji's Cooking Show",
      channel: "J. Kenji López-Alt",
      avatar: "/images/channels/avatars/3.jpg",
      preview: "/images/channels/previews/3.jpg",
      views: "203K views",
      published: "5 days ago",
    },
    {
      id: 5,
      title: "GO? NO! STOP! | Chained Together",
      channel: "Markiplier",
      avatar: "/images/channels/avatars/5.jpg",
      preview: "/images/channels/previews/5.jpg",
      views: "1.2M views",
      published: "12 hours ago",
    },
    {
      id: 6,
      title: "My Employees say I Need more Sleep….Lets try these",
      channel: "Linus Tech Tips",
      avatar: "/images/avatars/6.jpg",
      preview: "/images/channels/previews/6.jpg",
      views: "456K views",
      published: "1 day ago",
    },
  ];

  return (
    <section className="flex flex-col gap-2 items-center w-full max-w-7xl justify-center mb-32">
      <SectionTitle
        title="Quickly preview thumbnails and titles."
        description="Preview your thumbnails and titles across multiple YouTube formats - home feed, search results, and suggested videos. See your content through your viewers' eyes."
        paragraphStyle="px-40"
      />
      <div className="flex items-center gap-8 justify-center">
        <div className="flex flex-col w-[40%] self-start mt-10">
          <div className="flex text-sm font-bold w-fit mb-4 border border-black rounded-xl px-4 py-2 text-black">
            PREVIEW
          </div>
          <div className="text-4xl font-bold text-black mb-4">
            Stand out from your competition
          </div>
          <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
            See how your thumbnails and titles compare against your competition.
            Analyze what works in your niche and get inspiration from successful
            creators. Make data-driven decisions to improve your content's
            performance.
          </p>
        </div>
        <div className="w-[60%] bg-white rounded-3xl p-6">
          <div className="grid grid-cols-3 gap-4">
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
