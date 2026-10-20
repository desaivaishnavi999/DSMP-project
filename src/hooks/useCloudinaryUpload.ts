import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { api, resolveFileUrl } from "@/config/api";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<{ fileUrl: string; fileName: string } | null> => {
    if (!file) return null;

    setIsUploading(true);
    try {
      // Check if real Cloudinary credentials are provided
      const hasCloudinary =
        CLOUDINARY_CLOUD_NAME &&
        CLOUDINARY_UPLOAD_PRESET &&
        CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
        CLOUDINARY_UPLOAD_PRESET !== "your_upload_preset";

      if (hasCloudinary) {
        try {
          const formData = new FormData();
          formData.append("file", file);
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
        } catch (cError) {
          console.warn("Cloudinary upload failed, falling back to backend storage:", cError);
        }
      }

      // Default & reliable: Upload via backend file storage API
      const backendFormData = new FormData();
      backendFormData.append("file", file);

      const res = await api.post("/files/upload", backendFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsUploading(false);
      const returnedUrl = res.data.fileUrl;
      const fullUrl = resolveFileUrl(returnedUrl);

      return {
        fileUrl: fullUrl,
        fileName: res.data.fileName || file.name,
      };
    } catch (error: any) {
      console.error("File Upload Error:", error);
      const msg = error.response?.data?.message || "Failed to upload file.";
      toast.error(msg);
      setIsUploading(false);
      return null;
    }
  };

  return { uploadFile, isUploading };
}
