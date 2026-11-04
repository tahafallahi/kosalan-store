import { cacheLife } from "next/cache";
import { sdk } from "../medusa";
import { getRegionId } from "./region";

const regionId = await getRegionId()

export async function listProdcuts(categoryId?: string) {
  "use cache";
  cacheLife("minutes");

  const { products } = await sdk.store.product.list({
    category_id: categoryId,
    region_id: regionId,
    fields: "*variants.calculated_price, +metadata",
  });

  return products;
}

export async function retriveProductByHandle(productHandle: string) {
  "use cache";
  cacheLife("minutes");

  const { products } = await sdk.store.product.list({
    handle: productHandle,
    region_id: regionId,
    fields: "*variants.calculated_price, +metadata",
  });

  return products[0];
}
