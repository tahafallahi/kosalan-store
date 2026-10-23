import { Icon } from "@phosphor-icons/react";
import { cn } from "cn";
import Link from "next/link";

interface Props {
  icon: Icon,
  text: string,
  link: string,
  selected?: boolean,
}

export default function NavLink({icon: IconCompoent, text, link, selected}: Props) {
  return (
    <Link className="flex flex-col items-center" href={link}>
      <IconCompoent size={25} {...selected && {weight: "fill", className: "text-primary"}}/>
      <p className={cn(selected && "text-primary font-semibold")}>{text}</p>
    </Link>
  );
}