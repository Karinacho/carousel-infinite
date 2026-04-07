/** Left edge of slide in the viewport scroll content coordinate system. */
export function slideLeftInScrollContent(
    slide: HTMLElement,
    viewport: HTMLElement,
  ): number {
    let left = 0;
    let el: HTMLElement | null = slide;
    let depth = 0;
  
    while (el && el !== viewport && depth < 24) {
      left += el.offsetLeft;
      el = el.offsetParent as HTMLElement | null;
      depth += 1;
    }
  
    return left;
  }
  
  export function slideCenterInScrollContent(
    slide: HTMLElement,
    viewport: HTMLElement,
  ): number {
    return slideLeftInScrollContent(slide, viewport) + slide.offsetWidth / 2;
  }
  
  /** Index of slide whose center is nearest the viewport center in scroll coordinates. */
  export function findCenteredSlideIndex(
    viewport: HTMLElement,
    slides: readonly HTMLElement[],
  ): number {
    if (slides.length === 0) return 0;
  
    const contentCenterX = viewport.scrollLeft + viewport.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
  
    for (let i = 0; i < slides.length; i++) {
      const el = slides[i];
      const sx = slideCenterInScrollContent(el, viewport);
      const d = Math.abs(sx - contentCenterX);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
  
    return best;
  }
  
  export function scrollToCenterSlide(
    slide: HTMLElement,
    viewport: HTMLElement,
  ): void {
    const cx = slideCenterInScrollContent(slide, viewport);
    const target = cx - viewport.clientWidth / 2;
    viewport.scrollTo({ left: Math.max(0, target), behavior: "auto" });
  }
  
  /**
   * Mandatory snap rewrites programmatic scroll; disable snap briefly around scrollTo.
   * Pass the CSS class name that disables snap, e.g. styles.viewportSnapOff.
   */
  export function runWithoutSnap(
    viewport: HTMLElement,
    snapOffClassName: string,
    run: () => void,
  ): void {
    viewport.classList.add(snapOffClassName);
    run();
  
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        viewport.classList.remove(snapOffClassName);
      });
    });
  }

  