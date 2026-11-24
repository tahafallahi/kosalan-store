"use server"

import { cookies as nextCookies } from "next/headers";
import { CART_COOKIE_NAME, CUSTOMER_COOKIE_NAME } from "../constants";
import { sdk } from "../medusa";

const JWT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export async function setAuthToken(token: string) {
  const cookies = await nextCookies();

  cookies.set(CUSTOMER_COOKIE_NAME, token, {
    maxAge: JWT_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export const getAuthHeaders = async (): Promise<
  { authorization: string } | object
> => {
  try {
    const cookies = await nextCookies();
    const token = cookies.get(CUSTOMER_COOKIE_NAME)?.value;

    if (!token) {
      return {};
    }

    return { authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
};

export async function setCartId(id: string) {
  const cookies = await nextCookies();
  cookies.set(CART_COOKIE_NAME, id, {
    maxAge: JWT_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCartId() {
  const cookies = await nextCookies()
  return cookies.get(CART_COOKIE_NAME)?.value
}

export async function removeCustomerCookies() {
  const cookies = await nextCookies()

  cookies.delete(CUSTOMER_COOKIE_NAME)

  return cookies
}