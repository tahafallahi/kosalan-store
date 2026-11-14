import { CustomerInformation } from "@/components/customer/customer-information/customer-information";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import TextSection from "@/components/layout/text-section/text-section";
import ProductList from "@/components/product/product-list/product-list";
import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import { formatNumber } from "@/lib/utils/format-number";
import { GetCartItemsCount } from "@/lib/utils/get-cart-items-count";
import { Suspense } from "react";

export default function Checkout() {
  return (
    <ContentPadding>
      <Suspense>
        <CheckoutContent />
      </Suspense>
    </ContentPadding>
  );
}

async function CheckoutContent() {
  const cart = await retrieveCart();
  const customer = await retrieveCustomer();

  const items =
    cart?.items?.toSorted(
      (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime(),
    ) ?? [];
  return (
    <>
      {cart?.items ? (
        <ProductList cartItems={items} />
      ) : (
        <p>کالایی در سبد خرید شما نیست.</p>
      )}
      {customer && <CustomerInformation customer={customer} />}
      <TextSection title="فاکتور" >
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p>قیمت کالاها { `\(${GetCartItemsCount(cart)}\)`}:</p>
            <p>{formatNumber(Number(cart?.item_total))} تومان</p>
          </div>
          <div className="flex justify-between">
            <p>هزینه ارسال:</p>
            <p>۱۵۰۰۰۰ تومان</p>
          </div>
          <div className="flex justify-between">
            <p>جمع کل:</p>
            <p>{formatNumber(Number(cart?.total))} تومان</p>
          </div>
        </div>
      </TextSection>

    </>
  );
}
