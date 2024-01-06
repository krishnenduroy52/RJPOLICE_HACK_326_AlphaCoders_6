import os
import cv2
import math
from ultralytics import YOLO
import cvzone
import requests
import time
import firebase_admin
from firebase_admin import credentials, storage

from util import send_notification

api_url = "http://localhost:8000/sendnotification/fire"
# Introduce a variable to store the time of the last notification
last_notification_time = 0

# Initialize count
count = 0

# Model With classes
model = YOLO("./Detection/model/fire.pt")
classNames = ["Fire", "default", "smoke"]


def fire_detection():
    global count
    if 'image' in requests.files:
        try:
            image = requests.files['image']
            img = cv2.imread(image)
            results = model(img, stream=True)
            download_link = None
            fire_detected = False

            for r in results:
                boxes = r.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                    conf = math.ceil((box.conf[0] * 100)) / 100
                    label = int(box.cls[0])

                    if (classNames[label] == 'Fire') and conf > 0.6:
                        fire_detected = True
                        cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                            0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)
                        count += 1
                        filename = f"fire-detection-{count}.jpg"
                        cv2.imwrite(filename, img)
                        bucket = storage.bucket()
                        blob = bucket.blob(filename)
                        blob.upload_from_filename(filename)
                        blob.make_public()
                        download_link = blob.public_url
                        os.remove(filename)
                        send_notification("fire")

            if fire_detected:
                return {'status': 'success', 'message': 'Fire detected', 'download_link': download_link}
            return {'status': 'success', 'message': 'No fire detected'}

        except Exception as e:
            return {'status': 'error', 'message': f"Error: {e}"}
