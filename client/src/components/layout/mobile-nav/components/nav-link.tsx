"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DoorOpenIcon,
  HouseIcon,
  ShoppingCartIcon,
  SquaresFourIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const icons = {
  home: HouseIcon,
  categories: SquaresFourIcon,
  cart: ShoppingCartIcon,
  profile: UserCircleIcon,
  enter: DoorOpenIcon
} as const;

export default function NavLink({
  icon,
  text,
  link,
}: {
  icon: keyof typeof icons;
  text: string;
  link: string;
}) {
  const pathname = usePathname();
  const active = link === "/" ? pathname === "/" : pathname.startsWith(link);
  const Icon = icons[icon];

  return (
    <Link
      href={link}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-col items-center gap-1",
        active ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Icon weight={active ? "fill" : "regular"} className="size-6" />
      <span>{text}</span>
    </Link>
  );
}