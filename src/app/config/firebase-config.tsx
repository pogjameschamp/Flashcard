// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXJ8eduoH93UaYeOQIieZRXKKBcSWAYG4",
  authDomain: "flashcard-app-966db.firebaseapp.com",
  projectId: "flashcard-app-966db",
  storageBucket: "flashcard-app-966db.appspot.com",
  messagingSenderId: "977245472541",
  appId: "1:977245472541:web:af4b229b1c0888a62b83f4",
  measurementId: "G-NFDBX1M1KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db };