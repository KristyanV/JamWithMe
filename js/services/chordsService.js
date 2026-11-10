import { transposeText } from "../utils/chordTransposer.js";
export function transposeArrangement(arrangement, semitones) {
  return { ...arrangement, chords: transposeText(arrangement.chords || "", semitones), lyrics: transposeText(arrangement.lyrics || "", semitones) };
}
export function createAuthorizedProvider(fetchArrangement) { return { fetchArrangement }; }
