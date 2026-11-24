"use client";

import Grid from "@/components/layout/grid/grid";
import { Card } from "@/components/ui/card";
import { CategoryWithImage } from "@/lib/data/categories";
import { StoreProductCategory } from "@medusajs/types";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

interface Props {
  categories: CategoryWithImage[];
}

export default function CategoriesColumn({ categories }: Props) {
  return (
    <section aria-label="دسته بندی ها">
      <Grid>
        {categories.map((c) => {
          if (c.handle === "همه-محصولات") {
            return (
              <Card key={c.id}>
                <Link
                  href={`/`}
                  className="flex flex-col items-center justify-end gap-0 rounded-lg pb-2"
                >
                  <div className="relative size-20 m-2">
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
                  <p>{c.name}</p>
                </Link>
              </Card>
            );
          }
        })}
        {categories.map((c) => {
          if (c.handle !== "همه-محصولات") {
            return (
              <Card key={c.id}>
                <Link
                  href={`/categories/${c.id}`}
                  className="flex flex-col items-center justify-end gap-0 rounded-lg pb-2"
                >
                  <div className="relative size-20 m-2">
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
                  <p>{c.name}</p>
                </Link>
              </Card>
            );
          }
        })}
      </Grid>
    </section>
  );
}
