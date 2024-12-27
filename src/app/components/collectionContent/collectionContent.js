import Image from "next/image";
import { ChevronLeft, Download, Trash2 } from "react-feather";
import { useState } from "react";
import ConfirmationModal from "@/app/components/modal/confirmationModal";
import { useSession } from "next-auth/react";

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

  const onDelete = async (collectionId, thumbnail) => {
    try {
      const response = await fetch("/api/collections/delete", {
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
    } catch (error) {
      console.error("Error deleting thumbnail:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="">Back</h2>
        </div>
      </div>

      {/* Grid of thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className="group relative aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800"
          >
            <Image
              src={thumbnail.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
            {/* Updated hover overlay with both buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
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
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (thumbnailToDelete) {
            onDelete(collection.id, thumbnailToDelete);
          }
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
