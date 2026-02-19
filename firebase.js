// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbgv4DpTw1UrkEzWDaEnbSFkBDz9Y-SkM",
  authDomain: "tendervault-90515.firebaseapp.com",
  projectId: "tendervault-90515",
  storageBucket: "tendervault-90515.firebasestorage.app",
  messagingSenderId: "514137398229",
  appId: "1:514137398229:web:425e755c854c8157383b5c",
  measurementId: "G-PZT750F00R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };