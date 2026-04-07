import { useCallback, type RefObject } from "react";
import { flushSync } from "react-dom";
import { virtualIndexAfterSnap } from "../libs/virtualWindow";
import { runWithoutSnap, scrollToCenterSlide } from "../libs/scrollPositioning";

type Params = {
  itemCount: number;
  mid: number;
  windowSize: number;
  viewportRef: RefObject<HTMLDivElement | null>;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  isCorrectingRef: RefObject<boolean>;
  virtualIndexRef: RefObject<number>;
  setVirtualIndex: React.Dispatch<React.SetStateAction<number>>;
  correctionFallbackTimeoutRef: RefObject<number | null>;
  snapOffClassName: string; // pass styles.viewportSnapOff
};

export function useApplyScrollCorrection({
  itemCount,
  mid,
  windowSize,
  viewportRef,
  slideRefs,
  isCorrectingRef,
  virtualIndexRef,
  setVirtualIndex,
  correctionFallbackTimeoutRef,
  snapOffClassName,
}: Params) {
  const applyScrollCorrection = useCallback(
    (slotIndex: number) => {
      const n = itemCount;
      if (n === 0 || isCorrectingRef.current) return;

      const delta = slotIndex - mid;
      if (delta === 0) return;

      const viewport = viewportRef.current;
      const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
      if (!viewport || slides.length !== windowSize) return;

      const midEl = slides[mid];
      if (!midEl) return;

      isCorrectingRef.current = true;

      const next = virtualIndexAfterSnap(
        virtualIndexRef.current,
        slotIndex,
        mid,
        n,
      );

      flushSync(() => {
        setVirtualIndex(next);
        virtualIndexRef.current = next;
      });

      const slidesAfter = slideRefs.current.filter(Boolean) as HTMLElement[];
      const midAfter = slidesAfter[mid];
      if (!midAfter) {
        isCorrectingRef.current = false;
        return;
      }

      runWithoutSnap(viewport, snapOffClassName, () => {
        scrollToCenterSlide(midAfter, viewport);
      });

      if (correctionFallbackTimeoutRef.current) {
        clearTimeout(correctionFallbackTimeoutRef.current);
      }

      correctionFallbackTimeoutRef.current = window.setTimeout(() => {
        correctionFallbackTimeoutRef.current = null;
        if (isCorrectingRef.current) {
          isCorrectingRef.current = false;
        }
      }, 400);
    },
    [
      itemCount,
      mid,
      windowSize,
      viewportRef,
      slideRefs,
      isCorrectingRef,
      virtualIndexRef,
      setVirtualIndex,
      correctionFallbackTimeoutRef,
      snapOffClassName,
    ],
  );

  return { applyScrollCorrection };
}