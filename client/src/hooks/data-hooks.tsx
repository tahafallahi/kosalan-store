"use client";

import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import { removeCustomerCookies } from "@/lib/data/cookies";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useRemoveCustomerCookies() {
  const response = useMutation({
    mutationFn: async () => await removeCustomerCookies(),
  });

  return response;
}
