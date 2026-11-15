import { cacheLife } from "next/cache";
import { sdk } from "../medusa";

import { HttpTypes } from "@medusajs/types"

export type CategoryImage = {
  id: string
  url: string
  file_id: string
  category_id: string
}

export type CategoryWithImage = HttpTypes.StoreProductCategory & {
  product_category_image?: CategoryImage[]
}

export async function listCategories() {
  "use cache";
  cacheLife("minutes");

  const categories = await sdk.store.category.list({fields: "*product_category_image"});


  return categories.product_categories as CategoryWithImage[];
}
