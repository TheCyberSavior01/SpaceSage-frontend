import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail
} from "firebase/auth";
import firebaseApp from "./firebase.config";


const auth = getAuth(firebaseApp);



export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const setDisplayName = (profile) => {
  return updateProfile(auth.currentUser, profile);
};

export const setEmail = (email) => {
  return updateEmail(auth.currentUser, email);
}