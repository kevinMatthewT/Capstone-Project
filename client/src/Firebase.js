// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword,
  sendPasswordResetEmail, signOut,} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCatqLIkZ5dmlkyIwq6QVZYGv2UyG0caYw",
  authDomain: "techasia-85dd0.firebaseapp.com",
  projectId: "techasia-85dd0",
  storageBucket: "techasia-85dd0.appspot.com",
  messagingSenderId: "976470689654",
  appId: "1:976470689654:web:687d16f5e7e96e85c0dc57",
  measurementId: "G-GSTYMPXJSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

// username and password
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

//resetPass
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  
//logout
  const logout = () => {
    signOut(auth);
};
  
export {
    auth, db,
    logInWithEmailAndPassword,
    sendPasswordReset,
    logout,
};