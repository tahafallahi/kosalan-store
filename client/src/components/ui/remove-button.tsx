"use client"

import { deleteLineItem } from "@/lib/data/cart";
import { Button } from "@base-ui/react";
import { StoreCartLineItem } from "@medusajs/types";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr";

interface Props {
  cartItem: StoreCartLineItem;
  className?: string;
}

export default function RemoveButton({ cartItem, className }: Props) {
  return (
    <Button
      className="absolute left-2 top-2 text-destructive bg-transparent p-2"
      onClick={() => deleteLineItem(cartItem.id)}
    >
      <TrashIcon className="size-6" weight="bold" />
    </Button>
  );
}
