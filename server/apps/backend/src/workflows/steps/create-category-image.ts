import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import ProductMediaModuleService from "../../modules/product-media/service";
import { PRODUCT_MEDIA_MODULE } from "../../modules/product-media";

export type CreateCategoryImagesStepInput = {
  category_image: {
    category_id: string;
    url: string;
    file_id: string;
  };
};

export const createCategoryStep = createStep(
  "create-category-image-step",
  async (input: CreateCategoryImagesStepInput, { container }) => {
    const productMediaService: ProductMediaModuleService =
      container.resolve(PRODUCT_MEDIA_MODULE);

    console.log(input.category_image + "hereeeeeeeeeee")

    const oldImages = await productMediaService.listProductCategoryImages({
      category_id: input.category_image.category_id,
    });
    if (oldImages.length) {
      await productMediaService.deleteProductCategoryImages(
        oldImages.map((img) => img.id),
      );
    }
    const createImages = await productMediaService.createProductCategoryImages(
      input.category_image,
    );

    return new StepResponse(createImages, createImages);
  },
  async (compensationData, { container }) => {
    if (!compensationData) {
      return;
    }

    const productMediaService: ProductMediaModuleService =
      container.resolve(PRODUCT_MEDIA_MODULE);

    await productMediaService.deleteProductCategoryImages(compensationData);
  },
);
