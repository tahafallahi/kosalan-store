"use client";

import { StoreCartLineItem } from "@medusajs/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatNumber } from "@/lib/utils/format-number";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import RemoveButton from "@/components/shared/button/remove-button";
import useCartContext from "@/hooks/contexts";
import QuantityButton from "@/components/shared/button/quantity-button";

interface Props {
  cartItem: StoreCartLineItem;
}

export default function ProductStrip({ cartItem }: Props) {
  const [optimisticCart, setOptimisticCart] = useCartContext();

  const opCartItem = optimisticCart?.items?.filter(
    (i) => i.product_id === cartItem.product_id,
  )[0];

  if (!opCartItem || !opCartItem.product) return null;

  return (
    <Card className="relative p-2 pt-2 flex flex-row gap-4">
      <Link href={`/products/${opCartItem.product.handle}`}>
        <div className="relative h-20 aspect-square">
          <Image
            src={opCartItem.thumbnail ?? ""}
            fill
            alt={`${opCartItem.product.title} نصویر`}
            sizes="(max-width: 768px)25vw, 15vw"
            className="object-contain self-center mb-2 bg-transparent w-full"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 w-full pl-2">
        <div>
          <h3 className="text-sm ">{opCartItem.product.title}</h3>
          <div className="flex gap-1">
            <StarIcon weight="fill" className="text-yellow-400" />
            <p className="text-muted-foreground text-xs translate-y-px">
              ۴.۴ (۴ نظر)
            </p>
          </div>
        </div>

        <div className="flex  gap-2 justify-between">
          <QuantityButton
            optimisticCart={optimisticCart!}
            setOptimisticCart={setOptimisticCart}
            cartItem={opCartItem}
            className="w-30 border-0 translate-x-3"
            small
            detailed
          />
          <p className="text-base font-bold text-primary self-end">{` ${formatNumber(Number(cartItem.unit_price) * cartItem.quantity)} تومان`}</p>
        </div>
      </div>
      <RemoveButton
        optimisticCart={optimisticCart!}
        setOptimisticCart={setOptimisticCart}
        cartItem={cartItem}
      />
    </Card>
  );
}
