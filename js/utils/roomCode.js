const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function createRoomCode(length = 6) {
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}
export function roomLink(code, page = "join.html") {
  return new URL(`${page}?room=${encodeURIComponent(code)}`, document.baseURI).href;
}
