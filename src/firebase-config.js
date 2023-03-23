import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyB4GJgZixwzgfNhD9LC34kxOxkTW2bsArg",
  authDomain: "umee-13afe.firebaseapp.com",
  projectId: "umee-13afe",
  storageBucket: "umee-13afe.appspot.com",
  messagingSenderId: "666577001701",
  appId: "1:666577001701:web:f021ab3981a6202f57080c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)