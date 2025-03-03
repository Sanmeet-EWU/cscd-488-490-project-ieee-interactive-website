import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Earls
/*const firebaseConfig = {
  apiKey: "AIzaSyBmrHC7VtY3jeyE_NgvqwOOKP-8uhijcgY",
  authDomain: "spokane-login.firebaseapp.com",
  projectId: "spokane-login",
  storageBucket: "spokane-login.firebasestorage.app",
  messagingSenderId: "33643930536",
  appId: "1:33643930536:web:7d479fb27c050904ce339d"
};*/

// Travis firebase
/*const firebaseConfig = {
  apiKey: "AIzaSyBH4OKWelcTHdgy4CTd-Q8AgewOsRVuAP4",
  authDomain: "ieee-394dc.firebaseapp.com",
  projectId: "ieee-394dc",
  storageBucket: "ieee-394dc.firebasestorage.app",
  messagingSenderId: "122697645580",
  appId: "1:122697645580:web:d3ee0377ac385af09d7829",
  measurementId: "G-GGH814GLWE"
};*/

// IEEE Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnO2tK-276urwxYfismE_FUP_lPXhZG4Q",
  authDomain: "caitlinchb-75527.firebaseapp.com",
  projectId: "caitlinchb-75527",
  storageBucket: "caitlinchb-75527.firebasestorage.app",
  messagingSenderId: "959926242614",
  appId: "1:959926242614:web:bea5ef6e57ec257c5af797"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
