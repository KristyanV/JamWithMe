export function renderLyrics(element, song, { showChords = true } = {}) {
  element.replaceChildren();
  element.classList.remove("empty-state", "linked-arrangement");
  if (song?.arrangementUrl) {
    try {
      const url = new URL(song.arrangementUrl);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("Unsupported link");
      const frame = document.createElement("iframe");
      frame.src = url.href;
      frame.title = `Chords and lyrics for ${song.title || "this song"}`;
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer";
      const link = document.createElement("a");
      link.href = url.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "button button-secondary";
      link.textContent = "Open arrangement in new tab";
      element.classList.add("linked-arrangement");
      element.append(frame, link);
      return;
    } catch {
      element.textContent = "The arrangement link is invalid.";
      element.classList.add("empty-state");
      return;
    }
  }
  if (!song?.lyrics) { element.textContent = "No lyrics added for this arrangement."; element.classList.add("empty-state"); return; }
  element.classList.remove("empty-state");
  element.textContent = showChords && song.chords ? `${song.chords}\n\n${song.lyrics}` : song.lyrics;
}
