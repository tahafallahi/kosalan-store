"use client";

import { useOptimistic, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRetriveCart } from "./hooks/data-hooks";
import CartContenxt from "./contexts/cart";
import { StoreCart } from "@medusajs/types";
let browserQueryClient: QueryClient | undefined;
function getQueryClient() {
  // Keep server requests isolated and preserve the browser cache across renders.
  if (typeof window === "undefined") return new QueryClient();
  browserQueryClient ??= new QueryClient();
  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

export default function CartContextProvider({
  children, 
}: {
  children: ReactNode;
}) {
  const [optimisticCart, setOptimisticCart] = useOptimistic(useRetriveCart());
  return (
    <CartContenxt value={[optimisticCart, setOptimisticCart]}>
      {children}
    </CartContenxt>
  );
}
