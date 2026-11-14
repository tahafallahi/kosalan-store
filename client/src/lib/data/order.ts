import { HttpTypes } from "@medusajs/types";
import { sdk } from "../medusa";
import { getAuthHeaders } from "./cookies";

export async function retriveOrders(limit: number, offset: number) {
  const headers = { ...(await getAuthHeaders()) };

  const orders = await sdk.client.fetch<HttpTypes.StoreOrderListResponse>("/store/orders", {
    method: "GET",
    query: { limit, offset },
    headers: { ...headers },
    next: {tags: ["orders"]},
    cache: "force-cache"
  });

  return orders;
}

