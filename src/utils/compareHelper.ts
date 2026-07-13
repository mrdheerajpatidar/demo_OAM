// Comparison state manager for OAM frontend (using client localStorage)

export const COMPARE_EVENT = "oam-compare-update";

export function getComparedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("oam_compare");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addCompareId(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getComparedIds();
    if (current.includes(id)) return true;
    if (current.length >= 3) {
      // Limit to 3 projects
      return false;
    }
    const updated = [...current, id];
    localStorage.setItem("oam_compare", JSON.stringify(updated));
    window.dispatchEvent(new Event(COMPARE_EVENT));
    return true;
  } catch (e) {
    return false;
  }
}

export function removeCompareId(id: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getComparedIds();
    const updated = current.filter((x) => x !== id);
    localStorage.setItem("oam_compare", JSON.stringify(updated));
    window.dispatchEvent(new Event(COMPARE_EVENT));
  } catch (e) {}
}

export function clearCompare() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("oam_compare");
    window.dispatchEvent(new Event(COMPARE_EVENT));
  } catch (e) {}
}

export function isCompared(id: string): boolean {
  return getComparedIds().includes(id);
}
