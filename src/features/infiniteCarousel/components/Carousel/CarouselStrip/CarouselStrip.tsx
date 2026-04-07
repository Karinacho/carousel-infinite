import { type RefObject } from "react";
import { type CarouselItem } from "@/features/infiniteCarousel/types";
import styles from "./CarouselStrip.module.css";
import CarouselCard from "../CarouselCard/CarouselCard";
import { itemIndexForSlot } from "@/features/infiniteCarousel/libs/virtualWindow";

type CarouselStripProps = {
  stripSlots: readonly number[];
  virtualIndex: number;
  items: readonly CarouselItem[];
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
};
const CarouselStrip = ({
  stripSlots,
  virtualIndex,
  items,
  slideRefs,
}: CarouselStripProps) => {
  return (
    <div className={styles.strip}>
      {stripSlots.map((slot) => {
        const itemIndex = itemIndexForSlot(virtualIndex, slot, items.length);
        const item = items[itemIndex];

        return (
          <CarouselCard
            item={item}
            slot={slot}
            key={slot}
            slideRefs={slideRefs}
          />
        );
      })}
    </div>
  );
};

export default CarouselStrip;
