import Image from "next/image";
import { ChevronLeft, Download, Trash2 } from "react-feather";
import { useState } from "react";
import ConfirmationModal from "@/app/components/modal/confirmationModal";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function CollectionContent({ collection, onBack, onUpdate }) {
  const { data: session } = useSession();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [thumbnailToDelete, setThumbnailToDelete] = useState(null);
  const [thumbnails, setThumbnails] = useState(collection.thumbnails);

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `thumbnail-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading thumbnail:", error);
    }
  };

  const handleDeleteClick = (thumbnail) => {
    setThumbnailToDelete(thumbnail);
    setShowDeleteModal(true);
  };

  const handleDeleteThumbnail = async (collectionId, thumbnail) => {
    try {
      const response = await fetch("/api/collections/items/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
          thumbnailUrl: thumbnail.url,
          userId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete thumbnail");
      }

      const updatedThumbnails = thumbnails.filter(
        (t) => t.url !== thumbnail.url
      );
      setThumbnails(updatedThumbnails);

      if (onUpdate) {
        onUpdate({
          ...collection,
          thumbnails: updatedThumbnails,
        });
      }

      toast.success("Thumbnail deleted successfully");
    } catch (error) {
      console.error("Error deleting thumbnail:", error);
      toast.error("Failed to delete thumbnail");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">{collection.name}</h2>
      </div>

      {/* Thumbnails grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {thumbnails.map((thumbnail) => (
          <div
            key={thumbnail.url}
            className="relative group aspect-video rounded-lg overflow-hidden"
          >
            <Image
              src={thumbnail.url}
              alt="Thumbnail"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDownload(thumbnail.url)}
                  className="p-2 bg-black/90 rounded-lg text-white hover:bg-black transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(thumbnail)}
                  className="p-2 bg-black/90 rounded-lg text-white hover:bg-black transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setThumbnailToDelete(null);
        }}
        onConfirm={() => {
          handleDeleteThumbnail(collection.id, thumbnailToDelete);
          setShowDeleteModal(false);
          setThumbnailToDelete(null);
        }}
        title="Delete Thumbnail"
        message="Are you sure you want to delete this thumbnail? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
