import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
