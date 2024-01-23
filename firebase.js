import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, firebaseApp, database };
