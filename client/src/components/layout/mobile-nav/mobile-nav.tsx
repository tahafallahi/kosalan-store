import { HouseIcon, ShoppingCartIcon, SquaresFourIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import NavButton from "./nav-button";

export default function MobileNav() {
  return (
    <nav className="fixed bg-background bottom-0 left-0 right-0 min-h-22 isolate border-t md:hidden flex justify-between px-10 pt-4 text-muted-foreground text-sm">
      <NavButton icon={HouseIcon} text="محصولات"/>
      <NavButton icon={SquaresFourIcon} text="دسته بندی"/>
      <NavButton icon={ShoppingCartIcon} text="سبد خرید"/>
      <NavButton icon={UserCircleIcon} text="پروفایل"/>
    </nav>
  );
}