import { deleteDoc, doc, db } from "../firebase/firestore.js";
export function leaveRoom(roomId, uid) { return deleteDoc(doc(db, "rooms", roomId, "members", uid)); }
