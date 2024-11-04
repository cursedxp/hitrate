import { useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setChannelName, setChannelAvatar } from "@/app/redux/slices/app.slice";
import { useSelector } from "react-redux";
import { Info } from "react-feather";
export default function Creator() {
  const channelName = useSelector((state) => state.app.channelName);
  const channelAvatar = useSelector((state) => state.app.channelAvatar);
  const dispatch = useDispatch();
  const [creatorName, setCreatorName] = useState("");
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
            dispatch(setChannelName(channelTitle));
            dispatch(setChannelAvatar(avatarData[channelId]));
            setIsMatch(true);
          } else {
            dispatch(setChannelName(""));
            dispatch(setChannelAvatar(""));
            setIsMatch(false);
          }
        } else {
          dispatch(setChannelAvatar(""));
          dispatch(setChannelName(""));
          setIsMatch(false);
        }
      } catch (error) {
        console.error("Error searching for creator:", error);
        dispatch(setChannelAvatar(""));
        dispatch(setChannelName(""));
        setIsMatch(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setCreatorName("");
    dispatch(setChannelAvatar(""));
    dispatch(setChannelName(""));
    setIsMatch(false);
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 " />
        </div>
        Enter your YouTube channel name to set your channel avatar
      </div>
      {!isMatch && (
        <>
          <input
            type="text"
            placeholder="Creator name"
            className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-blue-100 active:outline-none  dark:text-white"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCreator();
              }
            }}
          />
          <button
            className="bg-blue-500 text-sm text-white p-2 rounded-md"
            onClick={handleAddCreator}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Loading..." : "Add Creator"}
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
                  src={channelAvatar}
                  alt={channelName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              )}
            </div>
            <div>{channelName}</div>
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
