import Image from "next/image";
import { Image as ImageIcon, Trash2 } from "react-feather";
import { useState } from "react";
import ConfirmationModal from "@/app/components/modal/confirmationModal";
import { toast } from "react-hot-toast";

export default function CollectionItem({ collection, onClick, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/collections/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId: collection.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete collection");
      }

      toast.success("Collection deleted successfully");
      if (onDelete) {
        onDelete(collection.id);
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Failed to delete collection");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div
        className="flex flex-col cursor-pointer group relative"
        onClick={onClick}
      >
        {/* Main large image */}
        <div className="aspect-[16/10] relative rounded-lg overflow-hidden bg-gray-100">
          {collection.thumbnails[0]?.url ? (
            <Image
              src={collection.thumbnails[0].url}
              alt={collection.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm">No thumbnails</span>
              </div>
            </div>
          )}

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`absolute top-2 right-2 p-2 bg-black/90 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed ${
              isDeleting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <Trash2
              className={`w-4 h-4 ${isDeleting ? "animate-pulse" : ""}`}
            />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 my-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="aspect-[16/10] relative rounded-lg overflow-hidden bg-gray-200"
            >
              {collection.thumbnails[index]?.url ? (
                <Image
                  src={collection.thumbnails[index].url}
                  alt={`${collection.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between space-y-1">
          <h3 className="font-semibold text-md">{collection.name}</h3>
          <p className="text-sm text-gray-500">
            {collection.thumbnails.length || 0} Items
          </p>
        </div>
      </div>
      <div onClick={handleModalClick}>
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Collection"
          message="Are you sure you want to delete this collection? This action cannot be undone."
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          type="danger"
        />
      </div>
    </div>
  );
}
