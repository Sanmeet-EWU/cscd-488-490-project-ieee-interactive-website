// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH4OKWelcTHdgy4CTd-Q8AgewOsRVuAP4",
  authDomain: "ieee-394dc.firebaseapp.com",
  projectId: "ieee-394dc",
  storageBucket: "ieee-394dc.firebasestorage.app",
  messagingSenderId: "122697645580",
  appId: "1:122697645580:web:d3ee0377ac385af09d7829",
  measurementId: "G-GGH814GLWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);

export { app, auth};