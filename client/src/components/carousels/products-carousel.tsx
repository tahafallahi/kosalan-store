"use client";

import Image from "next/image";
import {
  CarouselContent,
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";

interface Props {
  imagePaths: string[];
}

export default function ProductsCarousel({ imagePaths }: Props) {
  return (
    <Carousel
      dir="rtl"
      opts={{ align: () => 16, direction: "rtl", containScroll: false }}
    >
      <CarouselContent className="py-1">
        {imagePaths.map((p) => (
          <CarouselItem key={p} className="basis-2/3">
            <Card className="p-0 ">
              <Image
                src={p}
                alt={p.split("-").join(" ")}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden xl:flex left-auto right-2" />
      <CarouselNext className=" hidden xl:flex right-auto left-2" />
    </Carousel>
  );
}
