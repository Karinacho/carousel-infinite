import { type RefObject, type ReactNode } from "react";
import { type CarouselItem } from "@/features/infiniteCarousel/types";
import styles from "./CarouselStrip.module.css";
import CarouselCard from "../CarouselCard/CarouselCard";
import { itemIndexForSlot } from "@/features/infiniteCarousel/libs/virtualWindow";

type CarouselStripProps<T = unknown> = {
  stripSlots: readonly number[];
  virtualIndex: number;
  items: readonly CarouselItem<T>[];
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  renderItem?: (item: CarouselItem<T>, indexInStrip: number) => ReactNode;
};
const CarouselStrip = <T,>({
  stripSlots,
  virtualIndex,
  items,
  slideRefs,
  renderItem,
}: CarouselStripProps<T>) => {
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
            renderItem={renderItem}
          />
        );
      })}
    </div>
  );
};

export default CarouselStrip;
