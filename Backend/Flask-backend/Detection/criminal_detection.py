from deepface import DeepFace
import cv2
import numpy as np
import uuid

from util import store_image
from util import send_notification

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def criminal_detection(request):
    if 'image' in request.files and 'refImage' in request.files:
        download_link = None
        criminal_detected = False

        image = request.files['image']
        refImage = request.files['refImage']

        image = cv2.imdecode(np.fromstring(
            image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        refImage = cv2.imdecode(np.fromstring(
            refImage.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        faces = face_cascade.detectMultiScale(
            image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        if len(faces) == 0:
            return {'status': 'success', 'message': 'No face'}
        else:
            for (x, y, w, h) in faces:
                image = image[y:y+h, x:x+w]
                filename = f"cropped-{uuid.uuid4()}.jpg"
                result = DeepFace.verify(
                    refImage, image, enforce_detection=False)

                if result['verified'] == True:
                    criminal_detected = True
                    download_link = store_image(image, filename)
                    send_notification("Criminal")
                else:
                    criminal_detected = False
                    download_link = None

            if criminal_detected:
                return {'status': 'success', 'message': 'Criminal detected', 'download_link': download_link}
        return {'status': 'success', 'message': 'No criminal detected'}
