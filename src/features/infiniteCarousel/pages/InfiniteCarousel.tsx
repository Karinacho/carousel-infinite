import styles from "./InfiniteCarousel.module.css";
import type { CarouselItem } from "../types";
import CarouselContainer from "../components/Carousel/CarouselContainer/CarouselContainer";
const InfiniteCarousel = ({ items }: { items: CarouselItem[] }) => {
  return (
    <main className={styles.main}>
      <CarouselContainer items={items} />
    </main>
  );
};

export default InfiniteCarousel;
