import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBi4kWdnho_akhsGy6eTsdrnUxTfgunjEg",
    authDomain: "spotin-89dc7.firebaseapp.com",
    projectId: "spotin-89dc7",
    storageBucket: "spotin-89dc7.appspot.com",
    messagingSenderId: "1018756435619",
    appId: "1:1018756435619:web:38608da636fdbb2261b916",
    measurementId: "G-W1QV69FBYY"
}

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore(app);