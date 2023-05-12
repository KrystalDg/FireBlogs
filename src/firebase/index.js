import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTC5ZEmIMp0P_KhWzqEROoK7A7raxtXrQ",
  authDomain: "fireblogs-ed792.firebaseapp.com",
  projectId: "fireblogs-ed792",
  storageBucket: "fireblogs-ed792.appspot.com",
  messagingSenderId: "977726523027",
  appId: "1:977726523027:web:c27009ed7f5d5bdf242f66",
  measurementId: "G-YBLJVTW8W2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

const timestamp = serverTimestamp();

export { projectAuth, projectStorage, projectFirestore, timestamp };
