import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";
import {
  DetailWidgetProps,
  AdminProductCategory,
} from "@medusajs/framework/types";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { CategoryImage } from "../types";
import { ThumbnailBadge } from "@medusajs/icons";
import { CategoryMediaModal } from "../component/category/category-media-model";

type CategoryImagesResponse = {
  category_image: CategoryImage;
};

const CategoryMediaWidget = ({
  data,
}: DetailWidgetProps<AdminProductCategory>) => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["category-images", data.id],
    queryFn: async () => {
      const result = await sdk.client.fetch<CategoryImagesResponse>(
        `/admin/categories/${data.id}/image`,
      );
      return result;
    },
  });

  const image = response?.category_image;

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">تصویر</Heading>
        <CategoryMediaModal categoryId={data.id} existingImage={image} />
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-[repeat(auto-fill,96px)] gap-4">
          {isLoading && (
            <div className="col-span-full">
              <p className="text-ui-fg-subtle text-sm">بارگیری...</p>
            </div>
          )}
          {!isLoading && !image && (
            <div className="col-span-full">
              <p className="text-ui-fg-subtle text-sm">
                هنوز تصویری اضافه نشده است.
              </p>
            </div>
          )}
          {image && (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-ui-border-base bg-ui-bg-subtle"
            >
              <img
                src={image.url}
                alt={`Category image`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product_category.details",
});

export default CategoryMediaWidget;
