# Infinite image carousel

React carousel that loops infinitely, driven by **scroll only** (trackpad, touch, mouse wheel remapped to horizontal). 

## Virtualization

The carousel uses a **virtual window** (a fixed odd number of slide slots in the DOM, e.g. five). It does **not** mount one DOM node per image when you have hundreds or thousands of items.

**How it works (brief):**

- `virtualIndex` tracks which item from the full list is shown in the first slot.
- Each visible slot maps to an array index with wrap-around (`itemIndexForSlot`), so the strip feels infinite.
- When the user scrolls and settles on a slide that is not the center slot, `virtualIndex` is updated (`virtualIndexAfterSnap`) and the scroll position is adjusted so the middle slot stays centered—content changes under the same DOM slots.

Core math lives in `src/features/infiniteCarousel/libs/virtualWindow.ts`. Runtime wiring is in `useCarouselRuntime` and related hooks.

## Why the full item list stays in memory

I keep the item list in memory because the carousel needs instant, deterministic prev/next mapping; the DOM is windowed so we don’t mount thousands of slides, and the browser lazy-loads images. Fetching mid-scroll would add latency and complexity without much benefit at this scale.

## Vertical wheel → horizontal scroll (smoothness tradeoff)

On desktop, vertical wheel deltas are mapped to horizontal `scrollBy` in `useVerticalWheelToHorizontalScroll`. That is **not** the browser’s native vertical scroll path: the OS and browser usually apply their own momentum, coalescing, and timing for vertical scrolling. Here we translate each wheel event into a small horizontal nudge, so the feel can never match “native” vertical scrolling exactly.

Using `behavior: "auto"` for those `scrollBy` calls stayed **responsive and snappy** but felt **too fast** for comfortable browsing. Using `behavior: "smooth"` makes motion easier to follow but adds a **layered animation** (each event queues or overlaps smooth scrolling), which can feel **slightly laggy or less precise** than `auto`. I kept `smooth` as the default for a calmer UX, knowing it is a deliberate tradeoff.

