// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-84b72.firebaseapp.com",
  projectId: "blog-app-84b72",
  storageBucket: "blog-app-84b72.appspot.com",
  messagingSenderId: "366063787335",
  appId: "1:366063787335:web:af3259c832db518901c062"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);