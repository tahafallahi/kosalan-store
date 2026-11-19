"use client"

import { StoreCartLineItem } from "@medusajs/types";
import { formatNumber } from "@/lib/utils/format-number";
import AddRemoveButton from "@/components/ui/add-remove-button";
import useCartContext from "@/hooks/contexts";

interface Props {
  cartItem: StoreCartLineItem;
}

export default function ProductItem({ cartItem }: Props) {
  const [optimisticCart, setOptimsticCart] = useCartContext()

  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center translate-x-3 gap-2">

        <AddRemoveButton optimisticCart={optimisticCart} setOptimisticCart={setOptimsticCart} cartItem={cartItem} className="border-0" />
        <h3 className="text-sm ">{cartItem.title}</h3>
        </div>
        <p className="text-base font-bold text-primary">{` ${formatNumber(Number(cartItem.unit_price)* cartItem.quantity)} تومان`}</p>
    </div>
  );
}
