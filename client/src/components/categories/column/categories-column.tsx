"use client";

import Grid from "@/components/layout/grid/grid";
import { Card } from "@/components/ui/card";
import { StoreProductCategory } from "@medusajs/types";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

interface Props {
  categories: StoreProductCategory[];
}

export default function CategoriesColumn({ categories }: Props) {
  return (
    <section aria-label="دسته بندی ها">
      <Grid>
        <Card>
        <Link
          href={`/`}
          className={cn(
            "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
          )}
        >
            <div className="relative size-20 m-2">
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
          </Card>
        {categories.map((c) => (
          <Card key={c.id}>
            <Link href={`/categories/${c.id}`} className="flex flex-col items-center justify-end gap-0 rounded-lg pb-2">
              <div className="relative size-20 m-2">
                <Image
                  src={`/categories/${c.handle}.png`}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 20vw, 200px"
                  className={cn("object-contain shrink-0 rounded")}
                />
              </div>
              <p>{c.name}</p>
            </Link>
          </Card>
        ))}
      </Grid>
    </section>
  );
}
