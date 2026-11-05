"use client";

import { usePathname } from "next/navigation";
import { ReactNode, Suspense } from "react";

interface Props {
  className: string;
  cart: ReactNode;
  checkout: ReactNode;
}

export default function CartDetailesWrapper({
  className,
  cart,
  checkout,
}: Props) {
  const pathName = usePathname();
  return (
    <div className={className}>
      {pathName.startsWith("/cart/checkout") ? (
        <Suspense>{checkout}</Suspense>
      ) : pathName.startsWith("/cart") ? (
        <Suspense>{cart}</Suspense>
      ) : null}
    </div>
  );
}
