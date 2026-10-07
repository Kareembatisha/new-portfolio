/**
 * Decides whether the sticky header should be hidden: hide while scrolling down past `threshold`,
 * show again on any upward scroll. Small movements (under `delta`) are ignored to avoid flicker,
 * and the header is never hidden while the mobile menu is open.
 */
export function nextHeaderHidden(
  hidden: boolean,
  lastY: number,
  y: number,
  menuOpen: boolean,
  threshold = 96,
  delta = 8,
): boolean {
  if (menuOpen || y < threshold) return false;
  const diff = y - lastY;
  if (Math.abs(diff) < delta) return hidden;
  return diff > 0;
}
