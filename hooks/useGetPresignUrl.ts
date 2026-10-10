import { useMutation } from "@tanstack/react-query";
import { uploadApi } from "@/services/api/votingApi";

interface PresignUrlResult {
  url: string;
  key: string;
  publicUrl: string;
}

const getPresignUrl = async ([folder, fileType]: [string, string]): Promise<PresignUrlResult> => {
  try {
    const { data } = await uploadApi.getPresignedUrl(folder, fileType);
    return data;
  } catch (error) {
    console.error("Error getting presign URL:", error);
    throw error;
  }
};

export const useGetPresignUrl = () => {
  return useMutation<PresignUrlResult, Error, [string, string]>({
    mutationKey: ["presign-url"],
    mutationFn: getPresignUrl,
  });
};

