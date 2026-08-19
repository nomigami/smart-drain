import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC7Xh9fk80biBnK_iVeZ69cFp7n35DIIzc",
  authDomain: "smart-drain-38e06.firebaseapp.com",
  databaseURL: "https://smart-drain-38e06-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-drain-38e06",
  storageBucket: "smart-drain-38e06.firebasestorage.app",
  messagingSenderId: "942539442378",
  appId: "1:942539442378:web:c8318d391cd0079ba38c33",
  measurementId: "G-GR7WJ9607S"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);