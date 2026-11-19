"use client";

import ContentPadding from "@/components/layout/content-padding/content-padding";
import ProductsStripColumn from "@/components/product/product-strip-colmn/product-strip-column";
import useCartContext from "@/hooks/contexts";
import { useIsFetching } from "@tanstack/react-query";

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
    </ContentPadding>
  );
}
