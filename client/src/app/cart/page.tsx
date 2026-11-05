import ContentPadding from "@/components/layout/content-padding/content-padding";
import ProductsStripColumn from "@/components/product/product-strip-colmn/product-strip-column";
import { retrieveCart } from "@/lib/data/cart";
import { Suspense } from "react";

export default function Cart() {
  return (
    <ContentPadding>
      <Suspense>
        <CartContent />
      </Suspense>
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
        <ProductsStripColumn cartItems={items} />
      ) : (
        <p>کالایی در سبد خرید شما نیست.</p>
      )}
    </>
  );
}
