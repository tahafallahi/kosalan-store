import { Text } from "@medusajs/ui";
import { CategoryImage, UploadedFile } from "../../types";
import { CategoryImageItem } from "./category-image-item";

type CategoryImageGalleryProps = {
  existingImage?: CategoryImage;
  uploadedFile?: UploadedFile;
};

export const CategoryImageGallery = ({
  uploadedFile,
}: CategoryImageGalleryProps) => {
  // TODO filter deleted images

  const hasNoImages = !uploadedFile;

  return (
    <div className="bg-ui-bg-subtle size-full overflow-auto">
      <div className="grid h-fit auto-rows-auto grid-cols-4 gap-6 p-6">

        {uploadedFile && (
          <CategoryImageItem
            key={uploadedFile.id}
            id={uploadedFile.id}
            url={uploadedFile.url}
            alt="Uploaded"
          />
        )}

        {/* Empty state */}
        {hasNoImages && (
          <div className="col-span-4 flex items-center justify-center p-8">
            <Text className="text-ui-fg-subtle text-center">
              تصویری اضافه نشده است.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
