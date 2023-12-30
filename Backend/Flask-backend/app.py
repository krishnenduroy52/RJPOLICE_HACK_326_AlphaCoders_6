from flask import Flask, request
from flask_cors import CORS
import cv2
import math
from ultralytics import YOLO
import cvzone
import requests
import time


app = Flask(__name__)
cors = CORS(app)

global count
count = 0


api_url = "http://localhost:3001/sendnotification"

# Model With classes
model = YOLO("best.pt")
classNames = ['Handgun', 'Knife', 'Short_rifle']


# Introduce a variable to store the time of the last notification
last_notification_time = 0


@app.route('/upload', methods=['POST'])
def upload():
    if 'image' in request.files:
        image = request.files['image']

        # Yolo Prediction
        img = cv2.imread(image)
        results = model(img, stream=True)

        gun_detected = False
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                conf = math.ceil((box.conf[0] * 100)) / 100
                label = int(box.cls[0])

                # Check if the detected object is a gun
                if (classNames[label] == 'Handgun' or classNames[label] == 'Short_rifle') and conf > 0.5:
                    gun_detected = True
                    cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                        0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)
                    global count
                    count += 1
                    cv2.imwrite(f"detected-{count}.jpg", img)

                    current_time = time.time()
                    try:
                        if current_time - last_notification_time > 60:
                            print("Notification sent successfully")
                    except Exception as e:
                        print(f"Error sending notification: {e}")

                # Save the boxed image to the current directory

                    # current_time = time.time()
                    # # Introduce a delay of 60 seconds between notifications
                    # if current_time - last_notification_time > 60:
                    #     try:
                    #         response = requests.get(api_url)
                    #         # You can add more logic here to handle the response if needed
                    #         print("Notification sent successfully")
                    #         last_notification_time = current_time  # Update the last notification time
                    #     except Exception as e:
                    #         print(f"Error sending notification: {e}")
        if gun_detected:
            return {'status': 'success', 'message': 'Gun detected'}
        return {'status': 'success', 'message': 'No gun detected'}
    else:
        return {'status': 'failure', 'message': 'No image provided'}


if __name__ == '__main__':
    app.run(debug=True)
