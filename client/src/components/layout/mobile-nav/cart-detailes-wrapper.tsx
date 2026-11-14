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
    <>
      {pathName.startsWith("/cart/checkout") ? (
        <div className={className}>
          <Suspense>{checkout}</Suspense>
        </div>
      ) : pathName.startsWith("/cart") ? (
        <div className={className}>
          <Suspense>{cart}</Suspense>
        </div>
      ) : null}
    </>
  );
}
