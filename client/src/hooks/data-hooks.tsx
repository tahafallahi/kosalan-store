"use client";

import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import { useQuery } from "@tanstack/react-query";

export function useRetriveCart() {
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await retrieveCart(),
  });

  return cart;
}

export function useRetriveCustomer() {
   const { data: customer } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => await retrieveCustomer(),
  });

  return customer;
}