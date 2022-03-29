import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcdiitMDF6bYXdfW9aFQuiRtCz2SAtCzw",
  authDomain: "wholesalery-a587b.firebaseapp.com",
  projectId: "wholesalery-a587b",
  storageBucket: "wholesalery-a587b.appspot.com",
  messagingSenderId: "527719283664",
  appId: "1:527719283664:web:f4d867567e1ee216f557d5",
  measurementId: "G-YX4KBTBQ6Y",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
