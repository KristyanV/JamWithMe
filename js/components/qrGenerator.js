export function renderQrCode(container, value, options = {}) {
  if (typeof window.QRCode !== "function") throw new Error("QR code library is not loaded.");
  container.replaceChildren();
  return new window.QRCode(container, { text: value, width: 140, height: 140, ...options });
}
