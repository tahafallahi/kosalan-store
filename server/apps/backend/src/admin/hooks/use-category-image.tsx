import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { CategoryImage } from "../types";

type UseCategoryImageMutationsProps = {
  categoryId: string;
  onCreateSuccess?: () => void;
};

export const useCategoryImageMutations = ({
  categoryId,
  onCreateSuccess,
}: UseCategoryImageMutationsProps) => {
  const queryClient = useQueryClient();

  const uploadFilesMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const response = await sdk.admin.upload.create({ files });
      return response;
    },
    onError: (error) => {
      console.error("بارگذاری انجام نشد، دوباره امتحان کنید.:", error);
    },
  });

  const createImagesMutation = useMutation({
    mutationFn: async (image: Omit<CategoryImage, "id" | "category_id">) => {
      const response = await sdk.client.fetch(
        `/admin/categories/${categoryId}/image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: image,
        },
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-images", categoryId],
      });
      onCreateSuccess?.();
    },
  });

  // TODO add update and delete mutations

  return {
    uploadFilesMutation,
    createImagesMutation,
  };
};
