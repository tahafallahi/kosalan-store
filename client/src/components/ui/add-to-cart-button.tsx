"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./button";
import { StoreCart, StoreCartLineItem, StoreProduct } from "@medusajs/types";
import { cn } from "cn";
import { startTransition } from "react";
import { addToCart } from "@/lib/data/cart";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  optimisticCart: StoreCart | null | undefined;
  setOptimisticCart:
    | ((
        action:
          | StoreCart
          | ((pendingState: StoreCart | null | undefined) => StoreCart | null),
      ) => void)
    ;
  product: StoreProduct;
  className?: string;
}

export default function AddToCartButton({
  optimisticCart,
  setOptimisticCart,
  product,
  className,
}: Props) {
  const client = useQueryClient();

  return (
    <Button
      className={cn("w-full text-xs", className)}
      onClick={() => {
        startTransition(async () => {
          if (optimisticCart) {
            setOptimisticCart({
              ...optimisticCart,
              items: [
                ...(optimisticCart.items ?? []),
                {
                  quantity: 1,
                  id: `optimistic-${product.id}`,
                  product_id: product.id,
                  variant_id: product.variants![0].id,
                } as StoreCartLineItem,
              ],
            });
          } else {
            setOptimisticCart({
              items: [
                {
                  quantity: 1,
                  id: `optimistic-${product.id}`,
                  product_id: product.id,
                  variant_id: product.variants![0].id,
                } as StoreCartLineItem,
              ],
            } as StoreCart);
          }

          await addToCart(product.variants![0].id);

          client.invalidateQueries({ queryKey: ["cart"] });
        });
      }}
    >
      افزودن به سبد خرید
      <PlusIcon className="size-4" weight="bold" />
    </Button>
  );
}
