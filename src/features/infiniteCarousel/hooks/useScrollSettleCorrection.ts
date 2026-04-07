import { useCallback, type RefObject } from "react";
import { findCenteredSlideIndex } from "../libs/scrollPositioning";

type Params = {
  isCorrectingRef: RefObject<boolean>;
  viewportRef: RefObject<HTMLDivElement | null>;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  windowSize: number;
  itemCount: number;
  applyScrollCorrection: (slotIndex: number) => void;
};

export function useScrollSettleCorrection({
  isCorrectingRef,
  viewportRef,
  slideRefs,
  windowSize,
  itemCount,
  applyScrollCorrection,
}: Params) {
  const onScrollSettled = useCallback(() => {
    if (isCorrectingRef.current) return;

    const viewport = viewportRef.current;
    if (!viewport || itemCount === 0) return;

    const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
    if (slides.length !== windowSize) return;

    const centeredIndex = findCenteredSlideIndex(viewport, slides);
    applyScrollCorrection(centeredIndex);
  }, [
    applyScrollCorrection,
    isCorrectingRef,
    itemCount,
    slideRefs,
    viewportRef,
    windowSize,
  ]);

  return { onScrollSettled };
}