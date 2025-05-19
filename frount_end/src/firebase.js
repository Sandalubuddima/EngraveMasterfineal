// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC_kD_feRK_C4--qR5FOST9GumudsvcMqA",
    authDomain: "engravemaster-b0620.firebaseapp.com",
    databaseURL: "https://engravemaster-b0620-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "engravemaster-b0620",
    storageBucket: "engravemaster-b0620.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database instance
export const database = getDatabase(app);
