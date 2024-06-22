// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-application-7cfae.firebaseapp.com",
  projectId: "blog-application-7cfae",
  storageBucket: "blog-application-7cfae.appspot.com",
  messagingSenderId: "422019707338",
  appId: "1:422019707338:web:2eb02c36474f0e873fdf33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);