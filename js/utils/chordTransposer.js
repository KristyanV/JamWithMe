const SHARPS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const FLATS = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
export function transposeChord(chord, steps, preferFlats = false) {
  if (!chord) return chord;
  const match = chord.match(/^([A-G](?:#|b)?)(.*)$/);
  if (!match) return chord;
  const source = [...SHARPS, ...FLATS].indexOf(match[1]);
  const index = source % 12;
  const names = preferFlats ? FLATS : SHARPS;
  return `${names[(index + steps % 12 + 12) % 12]}${match[2]}`;
}
export function transposeText(text, steps, preferFlats = false) {
  return text.replace(/\b[A-G](?:#|b)?(?:m|maj7|m7|7|sus[24]?|dim|aug|add\d+)?(?:\/[A-G](?:#|b)?)?\b/g, chord => transposeChord(chord, steps, preferFlats));
}
