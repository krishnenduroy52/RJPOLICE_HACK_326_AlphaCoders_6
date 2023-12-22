
var admin = require("firebase-admin");

var serviceAccount = require("./accountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Take the token from db
const registrationToken = 'fQ2yJxlpr026qOZX6B9CZk:APA91bE1W86niLrGWuPv5m1_3ZK2Cwo_dko1DXPXZjfvJwBNuemdsfIfdkMFjQBI7CQy_xPRkFqiQy78CgleBPDC0FJErshCLIkGoH92bJoVAP6lPCkKCI9cMANFOZBOUaZ9iuUVy9R2';

const message = {
    data: {
        // Custom data to be sent to the device
    },
    "webpush":{
        "notification": {
            "title": 'Demo Notification',
            "body": 'Notification from Node.js script',
            "icon": 'https://cdn.pixabay.com/photo/2016/11/19/12/24/path-1839000_1280.jpg',
            "click_action": 'https://www.google.com.',
            "sound": 'https://cdn.jsdelivr.net/npm/whatsapp-notification-sound@1.0.0/notification.mp3'
        },
    }
    ,
    token: registrationToken,
};

admin.messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
