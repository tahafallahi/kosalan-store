import ContentPadding from "@/components/layout/content-padding/content-padding";
import TextSection from "@/components/layout/text-section/text-section";
import ProductList from "@/components/product/product-list/product-list";
import { retrieveCart } from "@/lib/data/cart";
import { Suspense } from "react";

export default function Cart() {
  return (
    <ContentPadding>
      <Suspense>
        <CartContent />
      </Suspense>
      <TextSection title="آدرس و مشخصات" />
      <TextSection title="فارکتور" />
    </ContentPadding>
  );
}

async function CartContent() {
  const cart = await retrieveCart();

  const items =
    cart?.items?.toSorted(
      (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime(),
    ) ?? [];
  return (
    <>
      {cart?.items ? (
        <ProductList cartItems={items}/>
      ) : (
        <p>کالایی در سبد خرید شما نیست.</p>
      )}
    </>
  );
}
