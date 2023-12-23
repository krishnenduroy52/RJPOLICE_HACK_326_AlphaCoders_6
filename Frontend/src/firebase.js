import { initializeApp } from "firebase/app";
import { getToken, getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
  authDomain: "rajasthan-hackathon-project.firebaseapp.com",
  projectId: "rajasthan-hackathon-project",
  storageBucket: "rajasthan-hackathon-project.appspot.com",
  messagingSenderId: "1065541948138",
  appId: "1:1065541948138:web:8a546431c5ec39300d3d93",
  measurementId: "G-24QQ6YLZB5",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

// Krishnendu fix firebase foreground notification
// getOrRegisterServiceWorker function is used to try and get the service worker if it exists, otherwise it will register a new one.
export const getOrRegisterServiceWorker = async () => {
  if (
    "serviceWorker" in navigator &&
    typeof window.navigator.serviceWorker !== "undefined"
  ) {
    const serviceWorker = await window.navigator.serviceWorker.getRegistration(
      "/firebase-push-notification-scope"
    );
    if (serviceWorker) return serviceWorker;
    return window.navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      {
        scope: "/firebase-push-notification-scope",
      }
    );
  }
  throw new Error("The browser doesn`t support service worker.");
};
//
