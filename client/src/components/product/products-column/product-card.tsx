import { StoreProduct } from "@medusajs/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { formatNumber } from "@/lib/utils/format-number";

interface Props {
  product: StoreProduct;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="p-2 pt-2 flex flex-col gap-0">
      <Image
        src={product.images ? product.images[0]?.url : ""}
        width={200}
        height={200}
        alt={`${product.title} نصویر`}
        sizes="(max-width: 768px)25vw, 15vw"
        className="object-contain self-center mb-2 bg-transparent w-full"
      />

      <div className="mb-5">
      <h3 className="text-sm ">{product.title}</h3>
      <div className="flex gap-1">
      <StarIcon weight="fill"  className="text-yellow-400"/>
      <p className="text-muted-foreground text-xs translate-y-px">۴.۴ (۴ نظر)</p>
      </div>
        
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base font-bold text-primary self-end">{` ${formatNumber(Number(product.variants?.[0]?.calculated_price?.calculated_amount))} تومان`}</p>
        <AddToCartButton product={product} />
      </div>
    </Card>
  );
}
