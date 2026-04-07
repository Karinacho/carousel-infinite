import CarouselHeader from "../CarouselHeader/CarouselHeader";
import { CarouselContent } from "../CarouselContent/CarouselContent";
import type { CarouselItem } from "@/features/infiniteCarousel/types";
const CarouselContainer = ({ items }: { items: CarouselItem[] }) => {
  return (
    <>
      <CarouselHeader items={items} />
      <CarouselContent items={items} windowSize={5} />
    </>
  );
};

export default CarouselContainer;
