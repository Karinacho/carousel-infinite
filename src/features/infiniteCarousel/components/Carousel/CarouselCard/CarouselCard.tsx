import { CarouselItem } from "@/features/infiniteCarousel/types";
import { type RefObject } from "react";
import styles from "./CarouselCard.module.css";

type CarouselCardProps = {
  item: CarouselItem;
  slot: number;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
};
const CarouselCard = ({
  item,
  slot,
  slideRefs
}: CarouselCardProps) => {
  return (
    <div
      key={slot}
      ref={(el) => {
        slideRefs.current[slot] = el;
      }}
      className={styles.slide}
    >
      <div className={styles.frame}>
          <img
            className={styles.image}
            src={item.src}
            alt={item.key ?? ""}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
      </div>
    </div>
  );
};

export default CarouselCard;
