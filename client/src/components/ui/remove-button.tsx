"use client";

import { deleteLineItem } from "@/lib/data/cart";
import { Button } from "@base-ui/react";
import { StoreCart, StoreCartLineItem } from "@medusajs/types";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition } from "react";

interface Props {
  optimisticCart: StoreCart;
  setOptimisticCart: (
    action: StoreCart | ((pendingState: StoreCart | null) => StoreCart | null),
  ) => void;
  cartItem: StoreCartLineItem;
  className?: string;
}

export default function RemoveButton({
  optimisticCart,
  setOptimisticCart,
  cartItem,
  className,
}: Props) {
  const client = useQueryClient()

  return (
    <Button
      className="absolute left-1 top-2 text-destructive bg-transparent p-2"
      onClick={() => startTransition(async () => {
        setOptimisticCart({
          ...optimisticCart,
          total: optimisticCart.total - cartItem.unit_price * cartItem.quantity,
          items: optimisticCart.items?.filter(i => i.id !== cartItem.id)
        })
        await deleteLineItem(cartItem.id)

        client.invalidateQueries({queryKey: ["cart"]})
      })}
    >
      <TrashIcon className="size-6" weight="bold" />
    </Button>
  );
}
