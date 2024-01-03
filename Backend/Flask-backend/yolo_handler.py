import cv2
import math
from ultralytics import YOLO
import cvzone

model = YOLO("best.pt")
classNames = ['Handgun', 'Knife', 'Short_rifle']

def handle_yolo_prediction(img):
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

                return results, download_link, gun_detected

    return results, download_link, gun_detected
