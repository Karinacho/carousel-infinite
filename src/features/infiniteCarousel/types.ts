import type { ReactNode } from "react";

export type CarouselItem<T = unknown> = {
  /** Unique key for React list reconciliation */
  key: string;
  /** Passed to default render; for custom render, use as you like */
  src: string;
  alt?: string;
  /** Optional extra data for custom renderItem */
  data?: T;
};

export type InfiniteImageCarouselProps<T = unknown> = {
  items: readonly CarouselItem<T>[];
  /** Odd number of DOM slots (5 or 7 recommended). Default 5. */
  windowSize?: number;
  className?: string;
  /** Override default <img> rendering */
  renderItem?: (item: CarouselItem<T>, indexInStrip: number) => ReactNode;
};
