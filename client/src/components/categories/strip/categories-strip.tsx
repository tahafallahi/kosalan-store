"use client";

import { cn } from "cn";
import Image from "next/image";
import { useState } from "react";

export default function CategoriesStrip() {
  const [selected, setSelected] = useState<string | null>(null);

  const categoires = [
    "ادویه",
    "ارده",
    "ترشی",
    "روغن",
    "زیتون",
    "عرقیجات",
    "کره-مغزیجات",
    "لبنیات",
  ];

  return (
    <div className="absolute inset-x-0 px-4 overflow-x-scroll overflow-y-visible scrollbar-none -translate-y-1 ">
      <div className="flex w-fit gap-3">
        {categoires.map((c) => (
          <div
            key={c}
            className={cn(
              "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
              selected === c && "bg-primary/20 ring-2 ring-primary ring-inset",
            )}
              onClick={() => setSelected(c)}

          >
            <div className="relative size-15 m-2">

            <Image
              src={`/categories/${c}.png`}
              alt={c}
              fill
              sizes="(max-width: 768px) 15vw, 200px"
              className={cn("object-contain shrink-0 rounded")}
              />
              </div>
            <p className="text-xs">{c.split("-").join(" ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
