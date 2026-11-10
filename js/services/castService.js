export function isCastAvailable() { return typeof window.cast !== "undefined" && typeof window.cast.framework !== "undefined"; }
export async function startCasting() {
  if (!isCastAvailable()) throw new Error("Google Cast is not configured for this deployment.");
  return window.cast.framework.CastContext.getInstance().requestSession();
}
