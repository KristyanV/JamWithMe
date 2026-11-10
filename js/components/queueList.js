export function renderQueue(element, items, { host = false, canReorder = false, onSelect, onRemove, onMove } = {}) {
  element.innerHTML = "";
  const upcoming = items.filter(item => item.status !== "played");
  if (!upcoming.length) { element.innerHTML = '<p class="muted">No requests yet.</p>'; return; }
  upcoming.forEach((item, index) => {
    const row = document.createElement("div"); row.className = "queue-item";
    row.innerHTML = `<div class="queue-info"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.artist || "Unknown artist")} · ${escapeHtml(item.requestedByName || "Guest")}</small></div>`;
    const controls = document.createElement("div"); controls.className = "queue-controls";
    if (host) { const play = action("Play", () => onSelect(item)); controls.append(play); }
    if (canReorder) { const up = action("↑", () => onMove(item, items.find(other => other.position === item.position - 1))); const down = action("↓", () => onMove(item, items.find(other => other.position === item.position + 1))); controls.append(up, down); }
    if (host || onRemove) controls.append(action("×", () => onRemove(item)));
    row.append(controls); element.append(row);
  });
}
function action(label, handler) { const button = document.createElement("button"); button.textContent = label; button.title = label; button.addEventListener("click", handler); return button; }
function escapeHtml(value = "") { return value.replace(/[&<>"']/g, char => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[char])); }
