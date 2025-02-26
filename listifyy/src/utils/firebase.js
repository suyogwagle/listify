// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "listify-e76bb.firebaseapp.com",
  projectId: "listify-e76bb",
  storageBucket: "listify-e76bb.firebasestorage.app",
  messagingSenderId: "580322011819",
  appId: "1:580322011819:web:f22979f02e7e30546265ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);