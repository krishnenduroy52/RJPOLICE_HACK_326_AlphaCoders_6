from flask import Flask, request
from flask_cors import CORS
from gun_detection import gun_find
from licence_plate import license_plate_find
from ultralytics import YOLO

import numpy as np
import cv2
import base64
from io import BytesIO
import os
import math
import cvzone

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# yolo
model = YOLO("best.pt")


@app.route('/')
def hello():
    return "Hello hackathon (flask backend)"


classNames = ['Handgun', 'Knife', 'Short_rifle']

count = 0


@app.route('/testyolo', methods=['POST'])
def test_yolo():
    if 'frame' in request.json:
        frame_data = request.json['frame']
        frame_bytes = base64.b64decode(frame_data)

        # # Convert the bytes to a NumPy array
        frame_np = np.frombuffer(frame_bytes, dtype=np.uint8)

        # # Decode the image
        img = cv2.imdecode(frame_np, cv2.IMREAD_COLOR)
        results = model(img, stream=True)
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                conf = math.ceil((box.conf[0] * 100)) / 100
                label = int(box.cls[0])

                if (classNames[label] == 'Handgun' or classNames[label] == 'Short_rifle') and conf > 0.5:
                    cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                        0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)
                    filename = f"gun-detection-{count}.jpg"
                    cv2.imwrite(filename, img)
        return {"result": "success"}
    return {"result": "failed"}


if __name__ == '__main__':
    app.run(debug=True)
