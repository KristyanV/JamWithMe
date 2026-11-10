export function showNotification(message, element = document.querySelector("#toast")) {
  if (!element) return;
  element.textContent = message;
  element.classList.add("show");
  setTimeout(() => element.classList.remove("show"), 2400);
}
