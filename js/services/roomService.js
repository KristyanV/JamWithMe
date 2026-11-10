import { db, ready, collection, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot, query, orderBy, serverTimestamp } from "../firebase/firestore.js";
import { createRoomCode } from "../utils/roomCode.js";
const expiry = 1000 * 60 * 60 * 8;
export async function createRoom(hostName = "Host") {
  const user = await ready;
  const roomId = doc(collection(db, "rooms")).id;
  const code = createRoomCode();
  const room = { hostUid: user.uid, roomCode: code, hostName, status: "active", createdAt: serverTimestamp(), expiresAt: new Date(Date.now() + expiry), currentSong: null, currentPerformanceKey: null, capoPosition: 0, participantChordDisplayEnabled: false, participantReorderingEnabled: true, tvChordDisplayEnabled: false };
  await setDoc(doc(db, "rooms", roomId), room);
  await setDoc(doc(db, "roomCodes", code), { roomId, expiresAt: room.expiresAt });
  await setDoc(doc(db, "rooms", roomId, "members", user.uid), { displayName: hostName, role: "host", joinedAt: serverTimestamp() });
  return { id: roomId, ...room, uid: user.uid };
}
export async function findRoomByCode(code) {
  await ready;
  const codeSnap = await getDoc(doc(db, "roomCodes", code.toUpperCase()));
  if (!codeSnap.exists()) throw new Error("That room code is not available.");
  const roomSnap = await getDoc(doc(db, "rooms", codeSnap.data().roomId));
  if (!roomSnap.exists() || roomSnap.data().status !== "active" || roomSnap.data().expiresAt?.toDate?.() < new Date()) throw new Error("This jam has expired or ended.");
  return { id: roomSnap.id, ...roomSnap.data() };
}
export async function joinRoom(room, displayName) {
  const user = await ready;
  await setDoc(doc(db, "rooms", room.id, "members", user.uid), { displayName, role: "participant", joinedAt: serverTimestamp() });
  return user;
}
export function watchRoom(roomId, callback, onError) { return onSnapshot(doc(db, "rooms", roomId), snapshot => callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null), onError); }
export function watchMembers(roomId, callback, onError) { return onSnapshot(query(collection(db, "rooms", roomId, "members"), orderBy("joinedAt")), snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))), onError); }
export async function updateRoom(roomId, changes) { return updateDoc(doc(db, "rooms", roomId), changes); }
