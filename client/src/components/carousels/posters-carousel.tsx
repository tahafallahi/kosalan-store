"use client";

import Image from "next/image";
import {
  CarouselContent,
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

interface Props {
  imagePaths: string[];
}

export default function PostersCarousel({ imagePaths }: Props) {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <section aria-label="پوستر ها">
      <Carousel
        dir="rtl"
        opts={{ loop: true, align: "center", direction: "rtl", duration: 25 }}
        plugins={[autoplay]}
      >
        <CarouselContent>
          {imagePaths.map((p) => (
            <CarouselItem key={p} className="basis-4/5 pl-0 pr-4">
              <Image
                src={p}
                alt={p.split("-").join(" ")}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex left-auto right-2" />
        <CarouselNext className=" hidden xl:flex right-auto left-2" />
      </Carousel>
    </section>
  );
}
