"use client"
import { useRetriveCart } from "@/hooks/data-hooks";
import useCartContext from "@/hooks/contexts";
import { retrieveCart } from "@/lib/data/cart";
import { GetCartItemsCount } from "@/lib/utils/get-cart-items-count";
import { cn } from "cn";

interface Props {
  className?: string;
}

export default function CartCounter({ className }: Props) {
  const [optimisticCart] = useCartContext()

  return (
    <>
      {optimisticCart?.items ? (
        <p
          className={cn(
            "absolute -top-1 left-2 bg-red-500 rounded-full text-background w-5 h-5 text-center  text-sm/6",
            className,
          )}
        >
          {GetCartItemsCount(optimisticCart)}
        </p>
      ) : null}
    </>
  );
}
