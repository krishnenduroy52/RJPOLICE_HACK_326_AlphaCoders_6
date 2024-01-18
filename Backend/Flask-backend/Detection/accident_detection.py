import os
import cv2
import math
from ultralytics import YOLO
import cvzone
import time

import uuid
from util import send_notification
from util import store_image

last_notification_time = 0

# Model With classes
model = YOLO("./Detection/model/clash.pt")
classNames = ['Accident']


def accident_detection(request):
    global last_notification_time
    if 'image' in request.files:
        image = request.files['image']
        img = cv2.imread(image)
        results = model(img, stream=True)
        download_link = None
        accident = False

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                conf = math.ceil((box.conf[0] * 100)) / 100
                label = int(box.cls[0])

                if classNames[label] == 'Accident' and conf > 0.59:
                    accident = True
                    cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                        0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)

                    # Check if 20 seconds have elapsed since the last notification
                    current_time = time.time()
                    if current_time - last_notification_time >= 6:
                        last_notification_time = current_time
                        filename = f"Accident-detection-{uuid.uuid4()}.jpg"
                        download_link = store_image(img, filename)
                        send_notification("accident")

        if accident:
            return {'status': 'success', 'message': 'Accident detected', 'download_link': download_link}
        return {'status': 'success', 'message': 'No Accident detected'}
    else:
        return {'status': 'error', 'message': 'No image provided'}
