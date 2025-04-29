import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_APIKEY;
const authDomain = import.meta.env.VITE_AUTHDOMAIN;
const projectId = import.meta.env.VITE_PROJECTID;
const storageBucket = import.meta.env.VITE_STORAGEBUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
const appId = import.meta.env.VITE_APPID;
const measurementId = import.meta.env.VITE_MEASUREMENTID;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
