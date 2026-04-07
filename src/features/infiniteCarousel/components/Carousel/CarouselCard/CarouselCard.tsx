import { CarouselItem } from "@/features/infiniteCarousel/types";
import { type RefObject, type ReactNode } from "react";
import styles from "./CarouselCard.module.css";
type CarouselCardProps<T = unknown> = {
  item: CarouselItem<T>;
  slot: number;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  renderItem?: (item: CarouselItem<T>, indexInStrip: number) => ReactNode;
};
const CarouselCard = <T,>({
  item,
  slot,
  slideRefs,
  renderItem,
}: CarouselCardProps<T>) => {
  return (
    <div
      key={slot}
      ref={(el) => {
        slideRefs.current[slot] = el;
      }}
      className={styles.slide}
    >
      <div className={styles.frame}>
        {renderItem ? (
          renderItem(item, slot)
        ) : (
          <img
            className={styles.image}
            src={item.src}
            alt={item.key ?? ""}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
};

export default CarouselCard;
