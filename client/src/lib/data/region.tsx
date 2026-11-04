import { sdk } from "../medusa";

export async function getRegionId() {

  const { regions } = await sdk.store.region.list();
  const regionId = regions[0].id

  if (!regionId) throw new Error("There are no regions.")

  return  regionId
}
