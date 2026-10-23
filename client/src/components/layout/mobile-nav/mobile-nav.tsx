import { HouseIcon, ShoppingCartIcon, SquaresFourIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import NavLink from "./nav-link";

export default function MobileNav() {
  return (
    <nav className="fixed bg-card bottom-0 left-0 right-0  isolate border-t md:hidden flex justify-between px-10 pt-4 text-muted-foreground text-sm pb-[calc(max(1rem,env(safe-area-inset-bottom))+0.5rem)]">
      <NavLink icon={HouseIcon} text="خانه" link="/"/>
      <NavLink icon={SquaresFourIcon} text="دسته بندی" link="/categories"/>
      <NavLink icon={ShoppingCartIcon} text="سبد خرید" link="/cart"/>
      <NavLink icon={UserCircleIcon} text="پروفایل" link="/profile"/>
    </nav>
  );
}