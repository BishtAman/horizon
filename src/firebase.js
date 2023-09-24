// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzago2E-rX6O9zQhjODJwCP68A97kYPmQ",
  authDomain: "horizon-55271.firebaseapp.com",
  projectId: "horizon-55271",
  storageBucket: "horizon-55271.appspot.com",
  messagingSenderId: "989425246866",
  appId: "1:989425246866:web:0442e4574a446eebd93c4b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()
export const storage = getStorage()