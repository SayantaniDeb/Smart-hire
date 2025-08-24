import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error.message);
  }
};


