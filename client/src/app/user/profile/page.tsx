import { CustomerInformation } from "@/components/customer/customer-information/customer-information";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import TextSection from "@/components/layout/text-section/text-section";
import { Button } from "@/components/ui/button";
import { retrieveCustomer } from "@/lib/data/customer";
import { retriveOrders } from "@/lib/data/order";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Profile() {
  return (
    <ContentPadding>
      <Suspense>
        <ProfileCotent />
      </Suspense>
    </ContentPadding>
  );
}

async function ProfileCotent() {
  const customer = await retrieveCustomer();
  if (!customer) redirect("/user/auth");
  const orders = await retriveOrders(10, 0);

  return (
    <>
      <CustomerInformation customer={customer} showSignOutButton/>
      <TextSection title={"سفارش های من"}>
        {orders.count > 0 ? (
          orders.orders.map((o) => o.id)
        ) : (
          <p>شما سفارشی نداشته اید.</p>
        )}
      </TextSection>
    </>
  );
}
