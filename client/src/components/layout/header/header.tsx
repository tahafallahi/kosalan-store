"use client";

import { Button } from "@/components/ui/button";
import {
  ListIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeaderMenu from "./header-menu";

const HEADER_COLLAPSE_POINT = 300;

export default function Header() {
  const [collapse, setCollapse] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > HEADER_COLLAPSE_POINT) {
        setCollapse(true);
      } else setCollapse(false);
    }

    window.addEventListener("scroll", onScroll);
  });

  return (
    <header
      className={cn(
        "before:absolute before:bg-background before:-translate-y-14 md:before:-translate-y-15 before:left-0 before:right-0 before:h-14 isolate z-100 bg-background top-0 fixed left-0 right-0 min-h-14 border-t border-b flex items-center px-4 xl:px-30 md:min-h-16 transition-all duration-200",
        collapse ? "translate-y-0" : "translate-y-5 md:translate-y-8",
      )}
    >
      <Image
        src="/logo.png"
        width={50}
        height={50}
        sizes="(max-width: 768px) 15vw, 150px"
        loading="eager"
        alt="لوگوی کوسالان"
        className={cn(
          "w-11 aspect-square mx-4 md:mr-6 md:ml-7 xl:ml-20  transition-all duration-200",
          collapse
            ? "scale-100  md:scale-120 mx-0 md:mx-0"
            : "scale-180  md:scale-250",
        )}
      />

      <nav
        className={cn(
          "xl:flex gap-7 text-muted-foreground text-xl",
          menuIsOpen ? " max-xl:flex  max-xl:text-base  max-xl:flex-1 max-xl:gap-4 max-xl:mr-5" : "hidden",
        )}
      >
        <h2 className="hidden md:block">محصولات</h2>
        <h2 className="hidden md:block">دسته بندی</h2>
        <h2>بلاگ</h2>
        <h2>درباره ما</h2>
        <h2>تماس با ما</h2>
      </nav>

      <div className={cn("flex flex-1 justify-center md:mx-4", menuIsOpen && "hidden xl:flex")}>
        <Button className="flex-1 relative mx-4 bg-background rounded-full border-primary text-muted-foreground hover:bg-background xl:max-w-100  ">
          <MagnifyingGlassIcon className="absolute right-3" />
          جستجو
        </Button>
      </div>

      <nav className="flex  items-center gap-7 xl:gap-12">
        <h2 className="hidden md:inline font-semibold">ورود | ثبت نام</h2>
        <Button
          className="hidden md:inline p-0 border-none size-9"
          variant="ghost"
        >
          <ShoppingCartIcon className="size-full" weight="regular" />
        </Button>
        <HeaderMenu className="xl:hidden" menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      </nav>
    </header>
  );
}
