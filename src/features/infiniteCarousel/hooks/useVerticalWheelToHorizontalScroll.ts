import { useEffect, type RefObject } from "react";

type Params = {
  viewportRef: RefObject<HTMLDivElement | null>;
  scale?: number;
  minDeltaY?: number;
  behavior?: ScrollBehavior;
};

export function useVerticalWheelToHorizontalScroll({
  viewportRef,
  scale = 0.001,
  minDeltaY = 2,
  behavior = "smooth",
}: Params): void {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheelVerticalToHorizontal = (e: WheelEvent) => {
      // If user is already scrolling horizontally, don't remap.
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

      const el = viewport;
      const maxLeft = el.scrollWidth - el.clientWidth;
      const atLeft = el.scrollLeft <= 1;
      const atRight = el.scrollLeft >= maxLeft - 1;
      const goingRight = e.deltaY > 0;
      const goingLeft = e.deltaY < 0;

      // At boundaries, let page scroll naturally.
      if ((goingRight && atRight) || (goingLeft && atLeft)) return;

      // Ignore tiny jitter.
      if (Math.abs(e.deltaY) < minDeltaY) return;

      e.preventDefault();
      el.scrollBy({
        left: e.deltaY * scale,
        behavior,
      });
    };

    viewport.addEventListener("wheel", onWheelVerticalToHorizontal, {
      passive: false,
    });

    return () => {
      viewport.removeEventListener("wheel", onWheelVerticalToHorizontal);
    };
  }, [viewportRef, scale, minDeltaY, behavior]);
}
