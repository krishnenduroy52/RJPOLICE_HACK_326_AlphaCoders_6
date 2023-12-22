import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
    authDomain: "rajasthan-hackathon-project.firebaseapp.com",
    projectId: "rajasthan-hackathon-project",
    storageBucket: "rajasthan-hackathon-project.appspot.com",
    messagingSenderId: "1065541948138",
    appId: "1:1065541948138:web:8a546431c5ec39300d3d93",
    measurementId: "G-24QQ6YLZB5"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);