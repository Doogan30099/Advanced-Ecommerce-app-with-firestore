// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7nIpH0pR7ovuB9tUwyeXfqPk5wlv-WFo",
  authDomain: "e-commerce-app-824b0.firebaseapp.com",
  projectId: "e-commerce-app-824b0",
  storageBucket: "e-commerce-app-824b0.firebasestorage.app",
  messagingSenderId: "1001482156577",
  appId: "1:1001482156577:web:95c0045bae84dd4fd94160",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
