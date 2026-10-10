import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Replace these with your actual Cloudinary credentials or use environment variables
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "your_upload_preset";

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<{ fileUrl: string; fileName: string } | null> => {
    if (!file) return null;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // For raw files like PDF, ZIP, you might need to specify resource_type as 'raw' or 'auto'
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        formData
      );

      setIsUploading(false);
      return {
        fileUrl: response.data.secure_url,
        fileName: file.name,
      };
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Failed to upload file to Cloudinary.");
      setIsUploading(false);
      return null;
    }
  };

  return { uploadFile, isUploading };
}
