importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBY-PXD09ZyOLdsjLVc3Aby6W43BlPdcEo",
  authDomain: "rajasthan-hackathon-project.firebaseapp.com",
  projectId: "rajasthan-hackathon-project",
  storageBucket: "rajasthan-hackathon-project.appspot.com",
  messagingSenderId: "1065541948138",
  appId: "1:1065541948138:web:8a546431c5ec39300d3d93",
  measurementId: "G-24QQ6YLZB5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(messaging);
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    sound: payload.notification.sound,
    click_action: payload.notification.click_action,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
