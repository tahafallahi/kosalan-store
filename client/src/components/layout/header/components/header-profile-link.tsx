"use client"

import { useRetriveCustomer } from "@/hooks/data-hooks";
import Link from "next/link";

export default  function HeaderProfileLink() {
  const user = useRetriveCustomer();

  return (
    <>
      {user ? (
        <Link href="/user/profile">
          <h2 className="hidden md:inline font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
        </Link>
      ) : (
        <Link href="/user/auth">
          <h2 className="hidden md:inline font-semibold">ورود | ثبت نام</h2>
        </Link>
      )}
    </>
  );
}
