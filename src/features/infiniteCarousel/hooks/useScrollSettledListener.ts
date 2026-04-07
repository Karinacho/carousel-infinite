import { useEffect, type RefObject } from "react";

type Params = {
  viewportRef: RefObject<HTMLDivElement | null>;
  onScrollSettled: () => void;
  isCorrectingRef: RefObject<boolean>;
  correctionFallbackTimeoutRef: RefObject<number | null>;
  settleDebounceRef: RefObject<number | null>;
  settleDelayMs?: number; // default 80
  fallbackDelayMs?: number; // default 150
};

export function useCarouselScrollSettledListener({
  viewportRef,
  onScrollSettled,
  isCorrectingRef,
  correctionFallbackTimeoutRef,
  settleDebounceRef,
  settleDelayMs = 80,
  fallbackDelayMs = 150,
}: Params): void {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const supportsScrollEnd = "onscrollend" in window;

    const handleScrollEnd = () => {
      if (isCorrectingRef.current) {
        if (correctionFallbackTimeoutRef.current) {
          clearTimeout(correctionFallbackTimeoutRef.current);
          correctionFallbackTimeoutRef.current = null;
        }
        isCorrectingRef.current = false;
        return;
      }

      if (settleDebounceRef.current) clearTimeout(settleDebounceRef.current);
      settleDebounceRef.current = window.setTimeout(() => {
        settleDebounceRef.current = null;
        onScrollSettled();
      }, settleDelayMs);
    };

    viewport.addEventListener("scrollend", handleScrollEnd);

    let fallbackTimer: number | null = null;
    const onScrollFallback = () => {
      if (supportsScrollEnd) return;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(() => {
        fallbackTimer = null;
        onScrollSettled();
      }, fallbackDelayMs);
    };

    if (!supportsScrollEnd) {
      viewport.addEventListener("scroll", onScrollFallback, { passive: true });
    }

    return () => {
      viewport.removeEventListener("scrollend", handleScrollEnd);
      if (!supportsScrollEnd) {
        viewport.removeEventListener("scroll", onScrollFallback);
      }
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (settleDebounceRef.current) clearTimeout(settleDebounceRef.current);
      if (correctionFallbackTimeoutRef.current) {
        clearTimeout(correctionFallbackTimeoutRef.current);
      }
    };
  }, [
    viewportRef,
    onScrollSettled,
    isCorrectingRef,
    correctionFallbackTimeoutRef,
    settleDebounceRef,
    settleDelayMs,
    fallbackDelayMs,
  ]);
}
