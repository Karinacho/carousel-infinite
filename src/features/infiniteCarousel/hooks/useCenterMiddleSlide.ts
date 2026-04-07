import { useLayoutEffect, type RefObject } from "react";
import { runWithoutSnap, scrollToCenterSlide } from "../libs/scrollPositioning";

type Params = {
  viewportRef: RefObject<HTMLDivElement | null>;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  itemCount: number;
  windowSize: number;
  mid: number;
  snapOffClassName: string;
};

export function useCenterMiddleSlide({
  viewportRef,
  slideRefs,
  itemCount,
  windowSize,
  mid,
  snapOffClassName,
}: Params): void {
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || itemCount === 0) return;

    const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
    if (slides.length !== windowSize) return;

    const midEl = slides[mid];
    if (!midEl) return;

    runWithoutSnap(viewport, snapOffClassName, () => {
      scrollToCenterSlide(midEl, viewport);
    });
  }, [viewportRef, slideRefs, itemCount, windowSize, mid, snapOffClassName]);
}