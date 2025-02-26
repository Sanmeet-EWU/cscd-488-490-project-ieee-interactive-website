import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmrHC7VtY3jeyE_NgvqwOOKP-8uhijcgY",
  authDomain: "spokane-login.firebaseapp.com",
  projectId: "spokane-login",
  storageBucket: "spokane-login.firebasestorage.app",
  messagingSenderId: "33643930536",
  appId: "1:33643930536:web:7d479fb27c050904ce339d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
