import styles from "./CarouselHeader.module.css";
import type { CarouselItem } from "@/features/infiniteCarousel/types";
const CarouselHeader = ({ items }: { items: CarouselItem[] }) => {
  return (
    <header>
      <h1 className={styles.h1}>Infinite scroll carousel</h1>
      <p className={styles.p}>
        Scroll horizontally (trackpad, touch, or mouse wheel). Only scroll moves
        the strip; images use a fixed virtual window over {items.length} items.
      </p>
    </header>
  );
};

export default CarouselHeader;
