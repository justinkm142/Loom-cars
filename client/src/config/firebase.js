
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "loom-cars.firebaseapp.com",
  projectId: "loom-cars",
  storageBucket: "loom-cars.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
