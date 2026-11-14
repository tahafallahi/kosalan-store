
import { StoreCartLineItem } from "@medusajs/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatNumber } from "@/lib/utils/format-number";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { retriveProductById } from "@/lib/data/products";
import AddRemoveButton from "@/components/ui/add-remove-button";
import RemoveButton from "@/components/ui/remove-button";

interface Props {
  cartItem: StoreCartLineItem;
}

export default async function ProductStrip({ cartItem }: Props) {
  const product = await retriveProductById(cartItem.product!.id);
  return (
    <Card className="relative p-2 pt-2 flex flex-row gap-4">
      <Link href={`/products/${product.handle}`}>
        <div className="relative h-20 aspect-square">
          <Image
            src={product.images ? product.images[0]?.url : ""}
            fill
            alt={`${product.title} نصویر`}
            sizes="(max-width: 768px)25vw, 15vw"
            className="object-contain self-center mb-2 bg-transparent w-full"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 w-full pl-2">

        <div >
          <h3 className="text-sm ">{product.title}</h3>
          <div className="flex gap-1">
            <StarIcon weight="fill" className="text-yellow-400" />
            <p className="text-muted-foreground text-xs translate-y-px">
              ۴.۴ (۴ نظر)
            </p>
          </div>
        </div>

      <div className="flex  gap-2 justify-between">
        <AddRemoveButton cartItem={cartItem} className="w-30 border-0 translate-x-3" small detailed/>
        <p className="text-base font-bold text-primary self-end">{` ${formatNumber(Number(product.variants?.[0]?.calculated_price?.calculated_amount)* cartItem.quantity)} تومان`}</p>
      </div>
      </div>
      <RemoveButton cartItem={cartItem}/>
    </Card>
  );
}
