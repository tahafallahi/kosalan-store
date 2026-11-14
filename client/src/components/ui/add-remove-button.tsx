"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./button";
import { StoreCartLineItem } from "@medusajs/types";
import { cn } from "cn";
import { updateLineItem } from "@/lib/data/cart";

interface Props {
  cartItem: StoreCartLineItem;
  className?: string;
  detailed?: boolean
  small?: boolean
}

export default function AddRemoveButton({ cartItem, className, detailed, small }: Props) {
  return (
    <div className={cn("flex justify-between items-baseline border rounded-lg ", className)}>
      <Button
        className={cn(
          " text-xs bg-transparent text-primary", small && "py-0"
        )}
        onClick={() => updateLineItem(cartItem.id, cartItem.quantity + 1)}
      >
        <PlusIcon className="size-4" weight="bold" />
      </Button>
      <p className="-translate-y-1">{cartItem.quantity} {detailed && "عدد"}</p>
      <Button
        className={cn(
          "text-xs bg-transparent text-primary", small && "py-0",
        )}
        onClick={() => updateLineItem(cartItem.id, cartItem.quantity - 1)}
      >
        <MinusIcon className="size-4" weight="bold" />
      </Button>
    </div>
  );
}
