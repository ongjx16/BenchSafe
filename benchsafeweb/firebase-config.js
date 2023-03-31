import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxb5qs-u2Kyo-nYoBOh4_UlQqVCVrNPps",
    authDomain: "benchsafe-c2c71.firebaseapp.com",
    databaseURL: "https://benchsafe-c2c71-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "benchsafe-c2c71",
    storageBucket: "benchsafe-c2c71.appspot.com",
    messagingSenderId: "333913388586",
    appId: "1:333913388586:web:5cd25d488145a1b01db553",
    measurementId: "G-4PFQM98TZL"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// app.firestore().settings({
//     // Firebase Hosting options for localhost
//     host: "localhost:3100",
//     ssl: true
// });



export { auth, db };