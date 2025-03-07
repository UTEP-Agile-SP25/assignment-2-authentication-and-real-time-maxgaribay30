// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwOJedyJUx7i8VKWMX6KoP7RUwvlakYGY",
  authDomain: "garibaysandbox.firebaseapp.com",
  projectId: "garibaysandbox",
  storageBucket: "garibaysandbox.firebasestorage.app",
  messagingSenderId: "591570297353",
  appId: "1:591570297353:web:f93a9c0da3ea91c2ef8ed8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app