import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { createCategoryStep } from "./steps/create-category-image";

export type CreateCategoryImagesInput = {
  image: {
    category_id: string;
    url: string;
    file_id: string;
  };
};

export const createCategoryImagesWorkflow = createWorkflow(
  "create-category-images",
  (input: CreateCategoryImagesInput) => {

    const categoryImages = createCategoryStep({
      category_image: input.image,
    })

    return new WorkflowResponse(categoryImages)
  }
)