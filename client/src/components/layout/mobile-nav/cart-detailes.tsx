"use client"

import useCartContext from "@/hooks/contexts";
import { formatNumber } from "@/lib/utils/format-number";
import Link from "next/link";

export default function CartDetailes() {
  const [optimsticCart, setOptimisticCart] = useCartContext()

  return (
    <div className="flex justify-between">
      <Link
        href={"/cart/checkout"}
        className="bg-primary text-white px-10 rounded-lg text-base flex justify-center items-center"
      >
        <p>ثبت سفارش</p>
      </Link>

      <div className="items-end flex flex-col">
        <p>
          جمع{" "}
          {formatNumber(
            Number(optimsticCart?.items?.reduce((sum, item) => sum + item.quantity, 0)),
          )}{" "}
          کالا
        </p>
        <p className="text-primary font-bold text-base">
          {formatNumber(Number(optimsticCart?.total))} تومان
        </p>
      </div>
    </div>
  );
}
