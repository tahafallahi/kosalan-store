"use client"

import { CustomerInformation } from "@/components/customer/customer-information/customer-information";
import TextSection from "@/components/layout/text-section/text-section";
import ProductList from "@/components/product/product-list/product-list";
import useCartContext from "@/hooks/contexts";
import { useRetriveCustomer } from "@/hooks/data-hooks";
import { formatNumber } from "@/lib/utils/format-number";
import { GetCartItemsCount } from "@/lib/utils/get-cart-items-count";

export default function Checkout() {
  const [optimisticCart] = useCartContext();
  const customer = useRetriveCustomer();

  const items =
    optimisticCart?.items?.toSorted(
      (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime(),
    ) ?? [];

  return (
    <>
      {optimisticCart?.items ? (
        <ProductList cartItems={items} />
      ) : (
        <p>کالایی در سبد خرید شما نیست.</p>
      )}
      {customer && <CustomerInformation customer={customer} />}
      <TextSection title="فاکتور">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p>قیمت کالاها {`\(${GetCartItemsCount(optimisticCart)}\)`}:</p>
            <p>{formatNumber(Number(optimisticCart?.total))} تومان</p>
          </div>
          <div className="flex justify-between">
            <p>هزینه ارسال:</p>
            <p>۱۵۰۰۰۰ تومان</p>
          </div>
          <div className="flex justify-between">
            <p>جمع کل:</p>
            <p>{formatNumber(Number(optimisticCart?.total))} تومان</p>
          </div>
        </div>
      </TextSection>
    </>
  );
}
