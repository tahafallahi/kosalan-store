"use client"

import { addToCart, retrieveCart, updateLineItem } from "@/lib/data/cart";
import { StoreCart } from "@medusajs/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUpdateLineItem() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lineItemId,
      quantity,
    }: {
      lineItemId: string;
      quantity: number;
    }) => await updateLineItem(lineItemId, quantity),

    onMutate: async (variables) => {
      const { lineItemId, quantity } = variables;
      await client.cancelQueries({ queryKey: ["cart"] });

      const prevCart = client.getQueryData<StoreCart>(["cart"]);
      if (!prevCart) return;

      const prevItem = prevCart.items?.filter((i) => i.id === lineItemId)[0];
      if (!prevItem) return;

      const updatedItem = { ...prevItem, quantity: quantity };
      const updatedCart = {
        ...prevCart,
        items: [
          ...(prevCart.items?.filter((i) => i.id !== lineItemId) ?? []),
          updatedItem,
        ],
      };

      client.setQueryData(["cart"], updatedCart);

      return prevCart;
    },

    onSettled: async () => {
      await client.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (_error, _varaibles, onMutateResult) => {
      if (onMutateResult) client.setQueryData(["cart"], onMutateResult);
    },
  });
}

export function useAddToCart() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ variantId }: { variantId: string }) =>
      await addToCart(variantId),
    onMutate: async (variables) => {
      const { variantId } = variables;
      await client.cancelQueries({ queryKey: ["cart"] });

      const prevCart = client.getQueryData<StoreCart>(["cart"]);
      if (!prevCart) return;

      const newItem = { id: variantId, quantity: 1 };
      const updatedCart = {
        ...prevCart,
        items: [...(prevCart.items ?? []), newItem],
      };

      client.setQueryData(["cart"], updatedCart);

      return prevCart;
    },

    onSettled: () => {
      client.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (_error, _varaibles, onMutateResult) => {
      if (onMutateResult) client.setQueryData(["cart"], onMutateResult);
    },
  });
}

export function useRetriveCart() {
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await retrieveCart(),
  });


  return cart;
}
