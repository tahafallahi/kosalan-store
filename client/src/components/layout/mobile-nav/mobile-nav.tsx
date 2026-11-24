import NavLink from "./components/nav-link";
import CartCounter from "./components/cart-counter";
import { Suspense } from "react";
import CartDetailesWrapper from "./components/cart-detailes-wrapper";
import CartDetailes from "./components/cart-detailes";
import ProfileLink from "./components/profile-link";
import CheckoutDetails from "./components/checkout-details";

export default function MobileNav() {
  return (
    <div className="fixed bg-card bottom-0 left-0 right-0  isolate border-t md:hidden text-muted-foreground text-sm pb-[calc(max(1rem,env(safe-area-inset-bottom))+0.5rem)]">
      <CartDetailesWrapper
        className="border-b px-10 py-2 "
        cart={<CartDetailes />}
        checkout={<CheckoutDetails />}
      />
      <div>
        <nav className="flex justify-between px-10 pt-4">
          <NavLink icon="home" text="خانه" link="/" />
          <NavLink icon="categories" text="دسته بندی" link="/categories" />
          <div className="relative">
            <NavLink icon="cart" text="سبد خرید" link="/cart" />
            <CartCounter/>
          </div>
          <Suspense>
            <ProfileLink />
          </Suspense>
        </nav>
      </div>
    </div>
  );
}
