import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCmKvolMm2qF7hSsuazxStfQzjfVE7Iu-U",
  authDomain: "fir-new-app-cd9ee.firebaseapp.com",
  projectId: "fir-new-app-cd9ee",
  storageBucket: "fir-new-app-cd9ee.firebasestorage.app",
  messagingSenderId: "968576162574",
  appId: "1:968576162574:web:84f80e95c4a3f642cc155f",
  measurementId: "G-EC9XBCCRFM",
};

const app = initializeApp(firebaseConfig);
const dataB = getFirestore(app);
export const auth = getAuth(app);

export const logout = async (router) => {
  await signOut(auth);
  router.push("/login");
};


export default dataB;
