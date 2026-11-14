import { retrieveCart } from "@/lib/data/cart";
import { formatNumber } from "@/lib/utils/format-number";
import Link from "next/link";

export default async function CheckoutDetails() {
  const cart = await retrieveCart();
  return (
    <div className="flex justify-between">
      <Link
        href={""}
        className="bg-primary text-white px-10 rounded-lg text-base flex justify-center items-center"
      >
        <p>پرداخت</p>
      </Link>

      <div className="items-end flex flex-col">
        <p>
          مبلغ پرداختی
        </p>
        <p className="text-primary font-bold text-base">
          {formatNumber(Number(cart?.total))} تومان
        </p>
      </div>
    </div>
  );
}
