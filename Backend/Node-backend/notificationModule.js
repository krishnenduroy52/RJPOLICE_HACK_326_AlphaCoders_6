const admin = require("firebase-admin")

const serviceAccount = require("./accountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendNotification = async () => {
    const registrationToken = 'cNKrydZHw_IioHT9z7Sz6V:APA91bGp41GyCNV2bhieTRAot1bDcIPkaa3X5frIiVcAh51BnAkTFKqaWwNE_RoTd3JU90MChlvfpxqUMrqtmQKl_JaVjwbYcLXOqEQxjZ0y7OSV_cRhdI0EZVyH4ZXAxYFRYSbfVUhX';

    const message = {
        data: {
            // Custom data to be sent to the device
        },
        "webpush": {
            "notification": {
                "title": 'Demo Notification',
                "body": 'Notification from Node.js script',
                "image": 'https://cdn.pixabay.com/photo/2016/11/19/12/24/path-1839000_1280.jpg',
                "icon": 'https://cdn.pixabay.com/photo/2016/11/19/12/24/path-1839000_1280.jpg',
                "click_action": 'https://www.google.com.',
                "sound": 'https://cdn.jsdelivr.net/npm/whatsapp-notification-sound@1.0.0/notification.mp3',
            },
        },
        token: registrationToken,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// sendNotification();


exports.sendNotification = sendNotification