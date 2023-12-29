import math
from ultralytics import YOLO
import cv2
import cvzone
import requests
import time  # Import the time module

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

api_url = "http://localhost:3001/sendnotification"

model = YOLO("best.pt")

classNames = ['Handgun', 'Knife', 'Short_rifle']

cap = cv2.VideoCapture("gun.mp4")

# Introduce a variable to store the time of the last notification
last_notification_time = 0

while True:
    success, img = cap.read()
    results = model(img, stream=True)

    gun_detected = False  # Flag to check if a gun is detected in the current frame

    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
            conf = math.ceil((box.conf[0] * 100)) / 100
            label = int(box.cls[0])

            if classNames[label] in ["Handgun", "Knife", "Short_rifle"]:
                gun_detected = True

            cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)

    # Check if a gun is detected, and if so, make the API call
    if gun_detected:
        current_time = time.time()
        # Introduce a delay of 60 seconds between notifications
        if current_time - last_notification_time > 60:
            try:
                response = requests.get(api_url)
                # You can add more logic here to handle the response if needed
                print("Notification sent successfully")
                last_notification_time = current_time  # Update the last notification time
            except Exception as e:
                print(f"Error sending notification: {e}")

    # cv2.imshow("Image", img)
    if (cv2.waitKey(1) & 0xFF == ord('q')):
        break
