// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ9Cd22W-JjDBlu435fQkBVuzSumbcflg",
  authDomain: "swe-silverfun-app.firebaseapp.com",
  projectId: "swe-silverfun-app",
  storageBucket: "swe-silverfun-app.appspot.com",
  messagingSenderId: "320511968429",
  appId: "1:320511968429:web:b61100eb9aced6e46a3224",
  measurementId: "G-XHVN42CS9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);



