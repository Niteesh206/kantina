// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIGcqs11VV6n96h9GR3Y5dFDi8fH42BV0",
  authDomain: "kantina-36a26.firebaseapp.com",
  projectId: "kantina-36a26",
  storageBucket: "kantina-36a26.firebasestorage.app",
  messagingSenderId: "182606295970",
  appId: "1:182606295970:web:ec0f9013e9aaedc4bdb8fb",
  measurementId: "G-PDC8HZPYG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);