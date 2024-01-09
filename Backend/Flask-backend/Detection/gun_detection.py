import os
import cv2
import math
from ultralytics import YOLO
import cvzone
import time

import uuid
from util import send_notification
from util import store_image


api_url = "http://localhost:8000/sendnotification/gun"
last_notification_time = 0

# Model With classes
model = YOLO("./Detection/model/gun.pt")
classNames = ['Handgun', 'Knife', 'Short_rifle']


def gun_find(request):
    global last_notification_time
    if 'image' in request.files:
        image = request.files['image']
        img = cv2.imread(image)
        results = model(img, stream=True)
        download_link = None
        gun_detected = False

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                conf = math.ceil((box.conf[0] * 100)) / 100
                label = int(box.cls[0])

                if (classNames[label] == 'Handgun' or classNames[label] == 'Short_rifle') and conf > 0.6:
                    gun_detected = True
                    cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                        0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)

                    # Check if 20 seconds have elapsed since the last notification
                    current_time = time.time()
                    if current_time - last_notification_time >= 6:
                        last_notification_time = current_time
                        filename = f"gun-detection-{uuid.uuid4()}.jpg"
                        download_link = store_image(img, filename)
                        send_notification("Gun")

        if gun_detected:
            return {'status': 'success', 'message': 'Gun detected', 'download_link': download_link}
        return {'status': 'success', 'message': 'No gun detected'}
    else:
        return {'status': 'error', 'message': 'No image provided'}
