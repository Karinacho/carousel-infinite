/** Non-negative modulo: result in [0, n) */
export function mod(numer: number, n: number): number {
  if (n <= 0) return 0;
  return ((numer % n) + n) % n;
}

/**
 * `virtualIndex` is the item index shown in strip slot 0.
 * Slot i shows items[(virtualIndex + i) % length].
 * After user centers `slotIndex`, update virtualIndex so slot `mid` shows
 * what was at `slotIndex` before the scroll correction.
 */
export function virtualIndexAfterSnap(
  virtualIndex: number,
  slotIndex: number,
  mid: number,
  length: number,
): number {
  if (length <= 0) return 0;
  return mod(virtualIndex + slotIndex - mid, length);
}

/** Which item index is shown in strip slot `slot` for a given virtualIndex at slot 0. */
export function itemIndexForSlot(
  virtualIndex: number,
  slot: number,
  length: number,
): number {
  if (length <= 0) return 0;
  return mod(virtualIndex + slot, length);
}

export function assertOddWindowSize(windowSize: number): number {
  const w = Math.max(1, Math.floor(windowSize));
  return w % 2 === 0 ? w + 1 : w;
}
