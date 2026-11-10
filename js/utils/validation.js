export function requiredText(value, label) {
  const clean = String(value || "").trim();
  if (!clean) throw new Error(`${label} is required.`);
  return clean;
}
export function validRoomCode(value) { return /^[A-Z0-9]{6}$/.test(String(value || "").trim().toUpperCase()); }
