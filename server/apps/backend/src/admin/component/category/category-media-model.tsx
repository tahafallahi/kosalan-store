import { useState, useRef } from "react";
import { FocusModal, Button, Heading, toast } from "@medusajs/ui";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryImage, UploadedFile } from "../../types";
import { CategoryImageGallery } from "./category-image-gallery";
import { CategoryImageUpload } from "./category-image-upload";
import { useCategoryImageMutations } from "../../hooks/use-category-image";

type CategoryMediaModalProps = {
  categoryId: string;
  existingImage?: CategoryImage;
};

export const CategoryMediaModal = ({
  categoryId,
  existingImage,
}: CategoryMediaModalProps) => {
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { uploadFilesMutation, createImagesMutation } =
    useCategoryImageMutations({
      categoryId,
      onCreateSuccess: () => {
        setOpen(false);
        resetModalState();
      },
    });

  const isSaving = createImagesMutation.isPending;

  const resetModalState = () => {
    setUploadedFile(undefined);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetModalState();
    }
  };

  const handleUploadFile = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }
    const filesArray = Array.from(files);

    uploadFilesMutation.mutate(filesArray, {
      onSuccess: (data) => {
        setUploadedFile(data.files[0]);
      },
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    try {
      if (uploadedFile) {
        const imageToCreate = {
          url: uploadedFile.url,
          file_id: uploadedFile.id,}
        await createImagesMutation.mutateAsync(imageToCreate);
      }

      // TODO add update and delete operations


      queryClient.invalidateQueries({
        queryKey: ["category-images", categoryId],
      });
      setOpen(false);
      resetModalState();
      toast.success("تصویر با موفقیت بارگذاری شد.");
    } catch (error) {
      toast.error("تصویر بارگذاری نشد.");
    }
  };

  return (
    <FocusModal open={open} onOpenChange={handleOpenChange}>
      <FocusModal.Trigger asChild>
        <Button size="small" variant="secondary">
          ویرایش
        </Button>
      </FocusModal.Trigger>

      <FocusModal.Content>
        <FocusModal.Header>
          <Heading>ویرایش تصویر</Heading>
        </FocusModal.Header>

        <FocusModal.Body className="flex h-full overflow-hidden">
          <div className="flex w-full h-full flex-col-reverse lg:grid lg:grid-cols-[1fr_560px]">
            <CategoryImageGallery
              uploadedFile={uploadedFile}
            />
            <CategoryImageUpload
              fileInputRef={fileInputRef}
              isUploading={uploadFilesMutation.isPending}
              onFileSelect={handleUploadFile}
            />
          </div>
          {/* TODO show command bar */}
        </FocusModal.Body>
        <FocusModal.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <FocusModal.Close asChild>
              <Button size="small" variant="secondary">
                صرف نظر
              </Button>
            </FocusModal.Close>
            <Button size="small" onClick={handleSave} isLoading={isSaving}>
              دخیره
            </Button>
          </div>
        </FocusModal.Footer>
      </FocusModal.Content>
    </FocusModal>
  );
};
