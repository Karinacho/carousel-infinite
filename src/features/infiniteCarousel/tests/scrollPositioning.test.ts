import {
  findCenteredSlideIndex,
  runWithoutSnap,
  scrollToCenterSlide,
} from "../libs/scrollPositioning";

describe("scrollPositioning", () => {
  it("returns 0 for empty slides in findCenteredSlideIndex", () => {
    const viewport = document.createElement("div");
    Object.defineProperty(viewport, "scrollLeft", { value: 10, configurable: true });
    Object.defineProperty(viewport, "clientWidth", { value: 100, configurable: true });

    expect(findCenteredSlideIndex(viewport, [])).toBe(0);
  });

  it("centers slide using scrollToCenterSlide", () => {
    const viewport = document.createElement("div");
    const slide = document.createElement("div");

    Object.defineProperty(viewport, "clientWidth", { value: 300, configurable: true });
    Object.defineProperty(slide, "offsetWidth", { value: 100, configurable: true });
    Object.defineProperty(slide, "offsetLeft", { value: 500, configurable: true });
    Object.defineProperty(slide, "offsetParent", { value: viewport, configurable: true });

    const scrollTo = vi.fn();
    Object.defineProperty(viewport, "scrollTo", { value: scrollTo, configurable: true });

    scrollToCenterSlide(slide, viewport);

    expect(scrollTo).toHaveBeenCalledWith({ left: 400, behavior: "auto" });
  });

  it("temporarily toggles snap-off class in runWithoutSnap", () => {
    const viewport = document.createElement("div");
    const run = vi.fn();
    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });

    runWithoutSnap(viewport, "snap-off", run);

    expect(run).toHaveBeenCalledTimes(1);
    expect(viewport.classList.contains("snap-off")).toBe(false);

    raf.mockRestore();
  });
});
