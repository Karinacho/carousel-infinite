import type { CarouselItem } from "../types";
export function buildItems(count: number): CarouselItem[] {
  return Array.from({ length: count }, (_, i) => {
    const w = 320 + ((i * 37) % 280);
    const h = 240 + ((i * 53) % 360);
    return {
      key: `img-${i}`,
      src: `https://picsum.photos/seed/car-${i}/${w}/${h}`,
      alt: `Photo ${i + 1}`,
    };
  });
}
