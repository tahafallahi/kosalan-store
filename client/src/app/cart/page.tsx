"use client";

import ContentPadding from "@/components/layout/content-padding/content-padding";
import CartDetailes from "@/components/layout/mobile-nav/components/cart-detailes";
import ProductsStripColumn from "@/components/product/strip-colmn/product-strip-column";
import { Card } from "@/components/ui/card";
import useCartContext from "@/hooks/contexts";

export default function Cart() {
  const [optmisticCart] = useCartContext();
  const items =
    optmisticCart?.items?.toSorted(
      (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime(),
    ) ?? [];

  return (
    <ContentPadding>
      {optmisticCart === undefined ? (
        "در حال بارگذاری..."
      ) : optmisticCart?.items?.length ? (
        <ProductsStripColumn cartItems={items} />
      ) : (
        <p>کالایی در سبد خرید شما نیست.</p>
      )}
      <Card className="px-4 opacity-0 md:opacity-100">
        <CartDetailes />
      </Card>
    </ContentPadding>
  );
}
