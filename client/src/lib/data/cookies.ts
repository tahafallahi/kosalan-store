import { cookies as nextCookies } from "next/headers";

const JWT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export async function setAuthToken(token: string) {
  const cookies = await nextCookies();

  cookies.set("_medusa_jwt", token, {
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
    const token = cookies.get("_medusa_jwt")?.value;

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
  cookies.set("cart_id", id, {
    maxAge: JWT_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCartId() {
  const cookies = await nextCookies()
  return cookies.get("cart_id")?.value
}