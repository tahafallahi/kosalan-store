import { cacheLife } from "next/cache";
import { sdk } from "../medusa";

export async function listProdcuts(categoryId?: string) {
  "use cache";
  cacheLife("minutes");

  const { regions } = await sdk.store.region.list();
  const { products } = await sdk.store.product.list({
    category_id: categoryId,
    region_id: regions[0].id,
    fields: "*variants.calculated_price, +metadata",
  });

  return products;
}

export async function retriveProductByHandle(productHandle: string) {
  "use cache";
  cacheLife("minutes");

  const { regions } = await sdk.store.region.list();
  const { products } = await sdk.store.product.list({
    handle: productHandle,
    region_id: regions[0].id,
    fields: "*variants.calculated_price, +metadata",
  });

  return products[0];
}
