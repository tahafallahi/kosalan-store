import { Button } from "@/components/ui/button";
import { ListIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "cn";
import React, { useState } from "react";

interface Props {
  className?: string;
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderMenu({
  className,
  menuIsOpen,
  setMenuIsOpen,
}: Props) {
  return (
    <>
      <Button
        onClick={() => setMenuIsOpen((value) => !value)}
        variant="ghost"
        className={cn("p-0 border-none size-10", className)}
      >
        {menuIsOpen ?
        <MagnifyingGlassIcon className="size-full" />
        :
        <ListIcon className="size-full" />
        }
      </Button>
    </>
  );
}
