import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiZHMrcYKS4CPAj3jL8ksKxtGEbuCzJes",
  authDomain: "saas-project-380e1.firebaseapp.com",
  projectId: "saas-project-380e1",
  storageBucket: "saas-project-380e1.appspot.com",
  messagingSenderId: "467132109626",
  appId: "1:467132109626:web:6556b2c4bd5a97a258f603"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
