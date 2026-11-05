import { retrieveCustomer } from "@/lib/data/customer";
import NavLink from "./nav-link";

export default async function ProfileLink() {
  const user = await retrieveCustomer();
  return (
    <>
      {user ? (
        <NavLink icon="profile" text="پروفایل" link="/user/profile" />
      ) : (
        <NavLink icon="enter" text="ورود/ثبت نام" link="user/auth" />
      )}
    </>
  );
}
