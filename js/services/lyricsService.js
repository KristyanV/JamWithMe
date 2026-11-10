// Provider adapters can be added here without coupling the UI to a vendor API.
export function createManualArrangement({ title, artist = "", lyrics = "", chords = "", originalKey = null }) {
  return { title, artist, lyrics, chords, originalKey, sourceType: "manual", sections: [{ type: "lyrics", lines: lyrics.split("\n") }] };
}
export async function fetchAuthorizedArrangement(provider, query) {
  if (!provider || typeof provider.fetchArrangement !== "function") throw new Error("No authorized lyrics provider is configured.");
  return provider.fetchArrangement(query);
}
