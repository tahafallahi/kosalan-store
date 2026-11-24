"use client";

import { CategoryWithImage } from "@/lib/data/categories";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  categories: CategoryWithImage[];
}

export default function CategoriesStrip({ categories }: Props) {
  const { categoryId } = useParams();

  return (
    <section
      className="px-4 overflow-x-scroll overflow-y-visible scrollbar-none -translate-y-1"
      aria-label="دسته بندی ها"
    >
      <div className="flex w-fit gap-3">
        {categories.map((c) => {
          if (c.handle === "همه-محصولات") {
            return (
              <Link
                href={`/`}
                key={c.id}
                className={cn(
                  "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
                  c.id === categoryId && "bg-primary/20 border border-primary",
                )}
              >
                <div className="relative size-15 m-2">
                  {c.product_category_image?.[0]?.url && (
                    <Image
                      src={c.product_category_image[0].url}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 20vw, 200px"
                      className={cn("object-contain shrink-0 rounded")}
                    />
                  )}
                </div>
                <p className="text-xs">{c.name}</p>
              </Link>
            );
          }
        })}
        {categories.map((c) => {
          if (c.handle !== "همه-محصولات") {
            return (
              <Link
                href={`/categories/${c.id}`}
                key={c.id}
                className={cn(
                  "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
                  c.id === categoryId && "bg-primary/20 border border-primary",
                )}
              >
                <div className="relative size-15 m-2">
                  {c.product_category_image?.[0]?.url && (
                    <Image
                      src={c.product_category_image[0].url}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 20vw, 200px"
                      className={cn("object-contain shrink-0 rounded")}
                    />
                  )}
                </div>
                <p className="text-xs">{c.name}</p>
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
}
