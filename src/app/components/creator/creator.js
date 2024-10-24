import { useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Creator() {
  const [creatorName, setCreatorName] = useState("");
  const [creatorImage, setCreatorImage] = useState("");
  const [exactChannelName, setExactChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const handleAddCreator = async () => {
    if (creatorName.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/youTube?endpoint=intelligentSearch&query=${encodeURIComponent(
            creatorName
          )}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const channelId = data.items[0].snippet.channelId;
          const channelTitle = data.items[0].snippet.channelTitle;
          const avatarResponse = await fetch(
            `/api/youTube?endpoint=channelAvatars&channelIds=${channelId}`
          );
          const avatarData = await avatarResponse.json();
          if (avatarData[channelId]) {
            setCreatorImage(avatarData[channelId]);
            setExactChannelName(channelTitle);
            setIsMatch(true);
          } else {
            setCreatorImage("");
            setExactChannelName("");
            setIsMatch(false);
          }
        } else {
          setCreatorImage("");
          setExactChannelName("");
          setIsMatch(false);
        }
      } catch (error) {
        console.error("Error searching for creator:", error);
        setCreatorImage("");
        setExactChannelName("");
        setIsMatch(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setCreatorName("");
    setCreatorImage("");
    setExactChannelName("");
    setIsMatch(false);
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {!isMatch && (
        <>
          <input
            type="text"
            placeholder="Creator name"
            className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-md"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleAddCreator}
          >
            Add Creator
          </button>
        </>
      )}
      {isMatch && (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              ) : (
                <Image
                  src={creatorImage}
                  alt={exactChannelName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              )}
            </div>
            <div>{exactChannelName}</div>
          </div>
          <button
            className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={handleReset}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
