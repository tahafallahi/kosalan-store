"use client";

import Grid from "@/components/layout/grid/grid";
import { Card } from "@/components/ui/card";
import { cn } from "cn";
import Image from "next/image";

export default function CategoriesColumn() {
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
    <section>
      <Grid>
        {categoires.map((c) => (
          <Card key={c}>
            <div
              className={cn(
                "flex flex-col items-center justify-end gap-0 rounded-lg pb-2",
              )}
            >
              <div className="relative size-20 m-2">
                <Image
                  src={`/categories/${c}.png`}
                  alt={c}
                  fill
                  sizes="(max-width: 768px) 20vw, 200px"
                  className={cn("object-contain shrink-0 rounded")}
                />
              </div>
              <p className="">{c.split("-").join(" ")}</p>
            </div>
          </Card>
        ))}
      </Grid>
    </section>
  );
}
