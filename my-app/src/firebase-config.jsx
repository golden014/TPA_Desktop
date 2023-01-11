// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGxaLAvPY0hy1GJzJH6scR3WOqizUuDDo",
  authDomain: "stuck-in-the-movie-4a7b1.firebaseapp.com",
  projectId: "stuck-in-the-movie-4a7b1",
  storageBucket: "stuck-in-the-movie-4a7b1.appspot.com",
  messagingSenderId: "558940615109",
  appId: "1:558940615109:web:4b2da8e7ba12c7b97c5bac",
  measurementId: "G-BXTXZC7FSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const db = getFirestore(app); 

export const auth = getAuth(app);