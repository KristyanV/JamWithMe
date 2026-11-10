export function renderLyrics(element, song, { showChords = true } = {}) {
  if (!song?.lyrics) { element.textContent = "No lyrics added for this arrangement."; element.classList.add("empty-state"); return; }
  element.classList.remove("empty-state");
  element.textContent = showChords && song.chords ? `${song.chords}\n\n${song.lyrics}` : song.lyrics;
}
