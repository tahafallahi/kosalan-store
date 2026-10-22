import { Icon } from "@phosphor-icons/react";
import { cn } from "cn";

interface Props {
  icon: Icon,
  text: string,
  selected?: boolean,
}

export default function NavButton({icon: IconCompoent, text, selected}: Props) {
  return (
    <div className="flex flex-col items-center">
      <IconCompoent size={25} {...selected && {weight: "fill", className: "text-primary"}}/>
      <p className={cn(selected && "text-primary font-semibold")}>{text}</p>
    </div>
  );
}