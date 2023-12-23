// import demo from "../src/assets/demo.js"

importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js");

// console.log(demo)

const firebaseConfig = {
    apiKey: "AIzaSyBY-PXD09ZyOLdsjLVc3Aby6W43BlPdcEo",
    authDomain: "rajasthan-hackathon-project.firebaseapp.com",
    projectId: "rajasthan-hackathon-project",
    storageBucket: "rajasthan-hackathon-project.appspot.com",
    messagingSenderId: "1065541948138",
    appId: "1:1065541948138:web:8a546431c5ec39300d3d93",
    measurementId: "G-24QQ6YLZB5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Indrajit changes...
self.addEventListener('notificationclick', function (event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    event.waitUntil(
        clients.openWindow(notificationPayload.fcmOptions.link)
    );
});

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        image: payload.notification.image,
        sound: payload.notification.sound,
        click_action: payload.notification.click_action,
    };
    notificationPayload = payload

    self.registration.showNotification(notificationTitle, notificationOptions);

});