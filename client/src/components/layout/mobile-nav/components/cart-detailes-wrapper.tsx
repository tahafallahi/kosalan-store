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
          {checkout}
        </div>
      ) : pathName.startsWith("/cart") ? (
        <div className={className}>
          {cart}
        </div>
      ) : null}
    </>
  );
}
