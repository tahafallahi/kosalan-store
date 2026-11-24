"use server";

import { decodeToken } from "react-jwt";
import { sdk } from "../medusa";
import { setAuthToken } from "./cookies";
import { cache } from "react";
import { getAuthHeaders } from "./cookies";
import { updateTag } from "next/cache";
import { transferCart } from "./cart";
import { customerSchema } from "../schema/customer-schema";
import { redirect } from "next/navigation";

export const authenticate = async (formData: FormData) => {
  const phone = formData.get("phone");
  const response =
    ((await sdk.auth.login("customer", "phone-auth", {
      phone,
    })) as { location: string }) || null;

  if (
    typeof response === "string" ||
    !response.location ||
    response.location !== "otp"
  ) {
    throw new Error("Failed to login");
  }
};

export const verifyOtp = async (formData: FormData) => {
  const phone = formData.get("phone") as string;
  const otp = formData.get("otp") as string;
  
  if (!phone || !otp) {
    throw new Error("Phone and otp are required");
  }

  let token: string;
  
  token = (await sdk.auth.callback("customer", "phone-auth", {
    phone,
    otp,
  })) as string;

  const decoded = (decodeToken(token) as { actor_id: string }) || null;
  
  if (!decoded?.actor_id) {
    const authHeaders = { authorization: `Bearer ${token}` };

    await sdk.store.customer.create(
      {
        email: `${phone}@phone.com`,
        phone,
      },
      {},
      authHeaders,
    );
    
    token = (await sdk.auth.refresh(authHeaders)).token;
  }

  await setAuthToken(token);
  updateTag("customer");
  await transferCart();
  redirect("/")
};

export const retrieveCustomer = cache(async () => {
  const headers = await getAuthHeaders();

  if (!("authorization" in headers)) return null;

  try {
    const { customer } = await sdk.store.customer.retrieve({}, headers);
    return customer;
  } catch {
    return null;
  }
});

export async function updateCustomer(prevData: boolean, formData: FormData) {
  const headers = { ...(await getAuthHeaders()) };
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = customerSchema.safeParse(raw);

  if (!parsed.success) return false;

  const {
    "given-name": first_name,
    "family-name": last_name,
    "address-level1": province,
    "address-level2": city,
    "street-address": address_1,
    "postal-code": postal_code,
  } = parsed.data;

  await sdk.store.customer.update(
    {
      first_name,
      last_name,
    },
    {},
    headers,
  );

  const address = await retrieveCustomerAddress();

  if (address) {
    await sdk.store.customer.updateAddress(
      address.id,
      {
        province,
        city,
        address_1,
        postal_code,
      },
      {},
      headers,
    );
  } else {
    await sdk.store.customer.createAddress(
      {
        province,
        city,
        address_1,
        postal_code,
      },
      {},
      headers,
    );
  }

  return true;
}

export async function retrieveCustomerAddress() {
  const headers = { ...(await getAuthHeaders()) };

  const response = await sdk.store.customer.listAddress({}, headers);

  return response.addresses[0] ?? null;
}