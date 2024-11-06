export function isTouchDevice() {
  if (typeof window !== "undefined")
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
