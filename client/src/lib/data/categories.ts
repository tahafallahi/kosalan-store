import { cacheLife } from "next/cache";
import { sdk } from "../medusa";

export async function listCategories() {
  "use cache";
  cacheLife("minutes");

  const categories = await sdk.store.category.list();

  return categories.product_categories;
}
