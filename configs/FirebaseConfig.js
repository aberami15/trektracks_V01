// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOoLuh-oAQyfglIErjtlKtUHkZsZw8PQM",
  authDomain: "trektracks-a1081.firebaseapp.com",
  projectId: "trektracks-a1081",
  storageBucket: "trektracks-a1081.firebasestorage.app",
  messagingSenderId: "514286265053",
  appId: "1:514286265053:web:10d6bbd67e534992c1b134",
  measurementId: "G-XK0HW9FL72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);