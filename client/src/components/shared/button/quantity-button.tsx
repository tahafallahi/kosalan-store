"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { StoreCart, StoreCartLineItem } from "@medusajs/types";
import { cn } from "cn";
import { updateLineItem } from "@/lib/data/cart";
import { formatNumber } from "@/lib/utils/format-number";
import { startTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface Props {
  optimisticCart: StoreCart | null | undefined;
  setOptimisticCart: (
    action:
      | StoreCart
      | ((pendingState: StoreCart | null | undefined) => StoreCart | null),
  ) => void;
  cartItem: StoreCartLineItem;
  className?: string;
  detailed?: boolean;
  small?: boolean;
}

export default function QuantityButton({
  optimisticCart,
  setOptimisticCart,
  cartItem,
  className,
  detailed,
  small,
}: Props) {
  const client = useQueryClient();

  return (
    <div
      className={cn(
        "flex justify-between items-baseline border rounded-lg ",
        className,
      )}
    >
      <Button
        className={cn(" text-xs bg-transparent text-primary", small && "py-0")}
        onClick={() => {
          startTransition(async () => {
            if (optimisticCart)
              setOptimisticCart({
                ...optimisticCart,

                items: optimisticCart.items?.map((i) => {
                  if (i.id === cartItem.id) {
                    return {
                      ...i,
                      quantity: cartItem.quantity + 1,
                    };
                  } else {
                    return i;
                  }
                }),
                total: optimisticCart.total + cartItem.unit_price,
              });
            await updateLineItem(cartItem.id, cartItem.quantity + 1);

            client.invalidateQueries({ queryKey: ["cart"] });
          });
        }}
      >
        <PlusIcon className="size-4" weight="bold" />
      </Button>
      <p className="-translate-y-1">
        {formatNumber(cartItem.quantity)} {detailed && "عدد"}
      </p>
      <Button
        className={cn("text-xs bg-transparent text-primary", small && "py-0")}
        onClick={() => {
          startTransition(async () =>
            startTransition(async () => {
              if (optimisticCart)
                setOptimisticCart({
                  ...optimisticCart,
                  items: optimisticCart.items?.flatMap((i) => {
                    if (i.id === cartItem.id) {
                      if (cartItem.quantity - 1 !== 0) {
                        return {
                          ...i,
                          quantity: cartItem.quantity - 1,
                        };
                      } else {
                        return [];
                      }
                    } else {
                      return i;
                    }
                  }),
                  total: optimisticCart.total - cartItem.unit_price,
                });

              await updateLineItem(cartItem.id, cartItem.quantity - 1);

              client.invalidateQueries({ queryKey: ["cart"] });
            }),
          );
        }}
      >
        <MinusIcon className="size-4" weight="bold" />
      </Button>
    </div>
  );
}
