import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBM0_gz4UBxedUItisOmteyp8eszy7yveQ",
    authDomain: "react-chatapp-f6027.firebaseapp.com",
    projectId: "react-chatapp-f6027",
    storageBucket: "react-chatapp-f6027.appspot.com",
    messagingSenderId: "91334742334",
    appId: "1:91334742334:web:5bddd1e11b73b5557d1c6f"
}).auth();