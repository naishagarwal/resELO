// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcETIzadQCkbSPt03nxn6kktFSUqfTAiY",
  authDomain: "reselo.firebaseapp.com",
  projectId: "reselo",
  storageBucket: "reselo.appspot.com",
  messagingSenderId: "488113282061",
  appId: "1:488113282061:web:2d7f81c6f11db926b74944",
  measurementId: "G-LRVXF61D22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);