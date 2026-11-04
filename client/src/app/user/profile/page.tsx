import { retrieveCustomer } from "@/lib/data/customer";
import { redirect } from "next/navigation";

export default async function profile() {
  const customer = await retrieveCustomer();
  if (!customer) redirect("/user/auth");

  return (
      <h1>{customer.phone}</h1>
  );
}
