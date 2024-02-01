// authFunctions.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { ref, set } from "firebase/database";

import { database } from "./firebase";

const handleForgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Password reset failed:", error.message);
    throw error;
  }
};

const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Store user details in the Realtime Database
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      email,
    });

    console.log("User registered:", user);
    return user;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};

const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

const handleLogout = async (navigation) => {
  try {
    // Sign out the user
    await signOut(auth);

    // Log success message
    console.log("User logged out");

    // Navigate to the "Login" screen
    navigation.navigate("Login");
  } catch (error) {
    // Log and throw any errors that occur during logout
    console.error("Logout failed:", error.message);
    throw error;
  }
};

export { handleSignUp, handleLogin, handleForgotPassword, handleLogout };
