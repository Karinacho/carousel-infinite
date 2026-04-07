import {
  assertOddWindowSize,
  itemIndexForSlot,
  mod,
  virtualIndexAfterSnap,
} from "../libs/virtualWindow";

describe("virtualWindow utilities", () => {
  describe("mod", () => {
    it("returns non-negative modulo for positive numbers", () => {
      expect(mod(7, 5)).toBe(2);
    });

    it("returns non-negative modulo for negative numbers", () => {
      expect(mod(-1, 5)).toBe(4);
      expect(mod(-6, 5)).toBe(4);
    });

    it("returns 0 for non-positive divisor", () => {
      expect(mod(10, 0)).toBe(0);
      expect(mod(10, -2)).toBe(0);
    });
  });

  describe("itemIndexForSlot", () => {
    it("maps slot to item index with wrap-around", () => {
      expect(itemIndexForSlot(3, 0, 5)).toBe(3);
      expect(itemIndexForSlot(3, 2, 5)).toBe(0);
      expect(itemIndexForSlot(3, 4, 5)).toBe(2);
    });

    it("returns 0 when length is non-positive", () => {
      expect(itemIndexForSlot(2, 3, 0)).toBe(0);
    });
  });

  describe("virtualIndexAfterSnap", () => {
    it("keeps virtual index unchanged when centered slot is already mid", () => {
      expect(virtualIndexAfterSnap(4, 2, 2, 7)).toBe(4);
    });

    it("updates virtual index when snapping from a right slot", () => {
      expect(virtualIndexAfterSnap(1, 4, 2, 7)).toBe(3);
    });

    it("updates virtual index when snapping from a left slot", () => {
      expect(virtualIndexAfterSnap(1, 0, 2, 7)).toBe(6);
    });

    it("returns 0 when length is non-positive", () => {
      expect(virtualIndexAfterSnap(3, 1, 2, 0)).toBe(0);
    });
  });

  describe("assertOddWindowSize", () => {
    it("keeps odd positive values unchanged", () => {
      expect(assertOddWindowSize(5)).toBe(5);
    });

    it("bumps even values to next odd", () => {
      expect(assertOddWindowSize(4)).toBe(5);
      expect(assertOddWindowSize(2)).toBe(3);
    });

    it("floors decimals and enforces minimum of 1", () => {
      expect(assertOddWindowSize(6.9)).toBe(7);
      expect(assertOddWindowSize(0.2)).toBe(1);
      expect(assertOddWindowSize(-5)).toBe(1);
    });
  });
});
