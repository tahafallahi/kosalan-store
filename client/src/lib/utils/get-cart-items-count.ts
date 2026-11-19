import { StoreCart } from "@medusajs/types";
import { formatNumber } from "./format-number";

export function GetCartItemsCount(cart?: StoreCart | null) {
  return formatNumber(Number(cart?.items?.reduce((sum, item) => sum + item.quantity, 0)))
}