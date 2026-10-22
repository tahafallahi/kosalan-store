import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./button";
import { StoreProduct } from "@medusajs/types";
import { cn } from "cn";

interface Props {
  product: StoreProduct;
  className?: string;
}

export default function AddToCartButton({product, className}: Props) {
  return (
    <Button className={cn("w-full py-4 text-xs", className)}>
      افزودن به سبد خرید
      <PlusIcon className="size-4" weight="bold" />
    </Button>
  );
}
