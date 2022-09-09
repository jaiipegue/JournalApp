// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoKMUPrWC40Xlfxgfvxq8bEDI8gURUqHU",
  authDomain: "react-cursos-94ad2.firebaseapp.com",
  projectId: "react-cursos-94ad2",
  storageBucket: "react-cursos-94ad2.appspot.com",
  messagingSenderId: "1072432689680",
  appId: "1:1072432689680:web:a0b12773cbffe8dab91095",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
