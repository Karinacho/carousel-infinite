import type { InfiniteImageCarouselProps } from "@/features/infiniteCarousel/types";
import { assertOddWindowSize } from "@/features/infiniteCarousel/libs/virtualWindow";
import { useCarouselRuntime } from "@/features/infiniteCarousel/hooks/useCarouselRuntime";
import CarouselStrip from "../CarouselStrip/CarouselStrip";
import styles from "./CarouselContent.module.css";

export function CarouselContent<T = unknown>({
  items,
  windowSize: windowSizeProp = 5,
  className,
  renderItem,
}: InfiniteImageCarouselProps<T>) {
  const windowSize = assertOddWindowSize(windowSizeProp);

  const { viewportRef, slideRefs, virtualIndex, stripSlots } = useCarouselRuntime({
    itemsLength: items.length,
    windowSize,
    snapOffClassName: styles.viewportSnapOff,
  });

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label="Image carousel"
      >
        <CarouselStrip<T>
          stripSlots={stripSlots}
          virtualIndex={virtualIndex}
          items={items}
          slideRefs={slideRefs}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
}