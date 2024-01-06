const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("./accountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (object) => {
  const registrationToken =
    "djz0ZpmVruhrkmdgbiEFvk:APA91bEaNb4c2TdEOXtXs7Oo89CAD4A10QTPZxnedOQjNWDP1qQblAP7qARRiCAHgaRiMDhSHryjwemAFOuoxUIiN3GsEtwSjyiwrguhXtLpaRsb54U67BxsMtKrAN0WRWPraS292JpZ";

  const message = {
    data: {
      // Custom data to be sent to the device
    },
    webpush: {
      notification: {
        title: `${object} Detected in the area`,
        body: "Please check the live feed",
        icon: "https://cdn.pixabay.com/photo/2016/11/19/12/24/path-1839000_1280.jpg",
        click_action: "https://www.google.com.",
        sound:
          "https://cdn.jsdelivr.net/npm/whatsapp-notification-sound@1.0.0/notification.mp3",
      },
    },
    token: registrationToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// sendNotification();

exports.sendNotification = sendNotification;
