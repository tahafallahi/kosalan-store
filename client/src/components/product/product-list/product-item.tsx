import { StoreCartLineItem } from "@medusajs/types";
import { formatNumber } from "@/lib/utils/format-number";
import { retriveProductById } from "@/lib/data/products";
import AddRemoveButton from "@/components/ui/add-remove-button";

interface Props {
  cartItem: StoreCartLineItem;
}

export default async function ProductItem({ cartItem }: Props) {
  const product = await retriveProductById(cartItem.product!.id);
  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center translate-x-3 gap-2">

        <AddRemoveButton cartItem={cartItem} className="border-0" />
        <h3 className="text-sm ">{product.title}</h3>
        </div>
        <p className="text-base font-bold text-primary">{` ${formatNumber(Number(product.variants?.[0]?.calculated_price?.calculated_amount)* cartItem.quantity)} تومان`}</p>
    </div>
  );
}
