"use client";

import { StoreProductCategory } from "@medusajs/types";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  categories: StoreProductCategory[];
}

export default function CategoriesStrip({ categories }: Props) {
  const { categoryId } = useParams();

  return (
    <section
      className="px-4 overflow-x-scroll overflow-y-visible scrollbar-none -translate-y-1"
      aria-label="دسته بندی ها"
    >
      <div className="flex w-fit gap-3">
        <Link
          href={`/`}
          className={cn(
            "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
            !categoryId && "bg-primary/20 border border-primary",
          )}
        >
          <div className="relative size-15 m-2">
            <Image
              src={`/categories/همه.png`}
              alt={"همه محصولات"}
              fill
              sizes="(max-width: 768px) 15vw, 200px"
              className={cn("object-contain shrink-0 rounded")}
            />
          </div>
          <p className="text-xs">همه محصولات</p>
        </Link>
        {categories.map((c) => (
          <Link
            href={`/categories/${c.id}`}
            key={c.id}
            className={cn(
              "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
              c.id === categoryId && "bg-primary/20 border border-primary",
            )}
          >
            <div className="relative size-15 m-2">
              <Image
                src={`/categories/${c.handle}.png`}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 15vw, 200px"
                className={cn("object-contain shrink-0 rounded")}
              />
            </div>
            <p className="text-xs">{c.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
