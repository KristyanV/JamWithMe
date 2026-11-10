import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, onSnapshot, query, orderBy, serverTimestamp, runTransaction, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { firebaseConfig } from "./config.js";
import { ready } from "./auth.js";
const app = getApps()[0] || initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, doc, addDoc, setDoc, updateDoc, deleteDoc, getDoc, onSnapshot, query, orderBy, serverTimestamp, runTransaction, where, ready };
