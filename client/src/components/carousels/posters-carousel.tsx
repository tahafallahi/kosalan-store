import Image from "next/image";
import {
  CarouselContent,
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface Props {
  imagePaths: string[];
}

export default function PostersCarousel({ imagePaths }: Props) {
  return (
    <Carousel
      dir="rtl"
      opts={{ loop: true, align: "center", direction: "rtl" }}
    >
      <CarouselContent className="">
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
  );
}
