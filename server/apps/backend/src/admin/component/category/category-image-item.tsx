import { ThumbnailBadge } from "@medusajs/icons"

type CategoryImageItemProps = {
  id: string
  url: string
  alt: string
}

export const CategoryImageItem = ({
  id,
  url,
  alt,
}: CategoryImageItemProps) => {
  return (
    <div
      key={id}
      className="shadow-elevation-card-rest hover:shadow-elevation-card-hover focus-visible:shadow-borders-focus bg-ui-bg-subtle-hover group relative aspect-square h-auto max-w-full overflow-hidden rounded-lg outline-none"
    >
      {/* TODO add selection checkbox */}
      <img
        src={url}
        alt={alt}
        className="size-full object-cover object-center"
      />
    </div>
  )
}