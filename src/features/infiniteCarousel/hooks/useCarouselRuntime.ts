import { useEffect, useMemo, useRef, useState } from "react";
import { useApplyScrollCorrection } from "./useApplyScrollCorrection";
import { useScrollSettleCorrection } from "./useScrollSettleCorrection";
import { useCarouselScrollSettledListener } from "./useScrollSettledListener";
import { useVerticalWheelToHorizontalScroll } from "./useVerticalWheelToHorizontalScroll";
import { useCenterMiddleSlide } from "./useCenterMiddleSlide";

type Params = {
  itemsLength: number;
  windowSize: number;
  snapOffClassName: string;
};

export function useCarouselRuntime({
  itemsLength,
  windowSize,
  snapOffClassName,
}: Params) {
  const mid = Math.floor(windowSize / 2);

  const [virtualIndex, setVirtualIndex] = useState(0);
  const virtualIndexRef = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isCorrectingRef = useRef(false);
  const correctionFallbackTimeoutRef = useRef<number | null>(null);
  const settleDebounceRef = useRef<number | null>(null);

  useVerticalWheelToHorizontalScroll({ viewportRef });

  const { applyScrollCorrection } = useApplyScrollCorrection({
    itemCount: itemsLength,
    mid,
    windowSize,
    viewportRef,
    slideRefs,
    isCorrectingRef,
    virtualIndexRef,
    setVirtualIndex,
    correctionFallbackTimeoutRef,
    snapOffClassName,
  });

  const { onScrollSettled } = useScrollSettleCorrection({
    isCorrectingRef,
    viewportRef,
    slideRefs,
    windowSize,
    itemCount: itemsLength,
    applyScrollCorrection,
  });

  useCarouselScrollSettledListener({
    viewportRef,
    onScrollSettled,
    isCorrectingRef,
    correctionFallbackTimeoutRef,
    settleDebounceRef,
  });

  useEffect(() => {
    virtualIndexRef.current = virtualIndex;
  }, [virtualIndex]);

  const stripSlots = useMemo(
    () => Array.from({ length: windowSize }, (_, i) => i),
    [windowSize],
  );

  useCenterMiddleSlide({
    viewportRef,
    slideRefs,
    itemCount: itemsLength,
    windowSize,
    mid,
    snapOffClassName,
  });

  return { viewportRef, slideRefs, virtualIndex, stripSlots };
}