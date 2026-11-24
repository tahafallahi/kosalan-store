"use server";

import { HttpTypes } from "@medusajs/types";
import { sdk } from "../medusa";
import { getAuthHeaders, getCartId, setCartId } from "./cookies";
import { getRegionId } from "./region";

const regionId = await getRegionId();

export async function retrieveCart() {
  const cartId = await getCartId();

  const headers = {
    ...(await getAuthHeaders()),
  };

  if (cartId) {
    const response = await sdk.client.fetch<HttpTypes.StoreCartResponse>(
      `/store/carts/${cartId}`,
      {
        method: "GET",
        headers,
      },
    );
    const cart = response.cart;
    return cart;
  } else {
    return null;
  }
}

export async function getOrSetCart() {
  let cart = await retrieveCart();

  if (!cart) {
    const response = await sdk.store.cart.create({ region_id: regionId });
    cart = response.cart;
    await setCartId(cart.id);
  }

  return cart;
}

export async function addToCart(varaiantId: string) {
  const cart = await getOrSetCart();

  if (!cart) throw new Error("Failed to retrive or create cart.");

  const headers = { ...(await getAuthHeaders()) };

  await sdk.store.cart.createLineItem(
    cart.id,
    { quantity: 1, variant_id: varaiantId },
    {},
    headers,
  );

  
}

export async function updateLineItem(lineItemId: string, quantity: number) {
  const cart = await getOrSetCart();

  if (!cart) throw new Error("Failed to retrive or create cart.");

  const headers = { ...(await getAuthHeaders()) };

  await sdk.store.cart.updateLineItem(
    cart.id,
    lineItemId,
    { quantity },
    {},
    headers,
  );

}

export async function deleteLineItem(lineItemId: string) {
  const cart = await getOrSetCart();

  if (!cart) throw new Error("Failed to retrive or create cart.");

  const headers = { ...(await getAuthHeaders()) };

  await sdk.store.cart.deleteLineItem(cart.id, lineItemId, {}, headers);

}

export async function transferCart() {
  const cart = await retrieveCart();
  if (!cart) return;
  const headers = { ...(await getAuthHeaders()) };

  await sdk.store.cart.transferCart(cart.id, {}, headers);
}
