// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-2e5cf.firebaseapp.com",
  projectId: "blog-app-2e5cf",
  storageBucket: "blog-app-2e5cf.appspot.com",
  messagingSenderId: "75256804043",
  appId: "1:75256804043:web:49f2f2ae33edffad69a14e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);