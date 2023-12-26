from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import math
from ultralytics import YOLO
import cvzone
import numpy as np

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Load YOLO model
model = YOLO("best.pt")
classNames = ['Handgun', 'Knife', 'Short_rifle']

# Video capture
cap = None


def init_video_capture():
    global cap
    cap = cv2.VideoCapture(0)
    cap.set(3, 1280)
    cap.set(4, 720)


@app.route('/', methods=['GET'])
def index():
    return 'Hello World!'


@app.route('/upload', methods=['POST'])
def receive_stream():
    try:

        # Get the video file from the request
        video_file = request.files["video"]

        # Read the video stream from the file
        stream_bytes = video_file.read()
        return {'message': 'Stream received and processed successfully. Video saved to file.'}
    except Exception as e:
        return {'error': str(e)}
    # Get the video file from the request
    # video_file = request.files['video']

    # Read the video stream from the file
    # stream_bytes = video_file.read()

    # # Convert stream bytes to numpy array
    # nparr = np.frombuffer(stream_bytes, np.uint8)
    # frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # # Perform object detection
    # results = model(frame, stream=True)

    # for r in results:
    #     boxes = r.boxes
    #     for box in boxes:
    #         x1, y1, x2, y2 = box.xyxy[0]
    #         x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
    #         cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
    #         conf = math.ceil((box.conf[0]*100))/100
    #         label = int(box.cls[0])

    #         if label == 0:
    #             cvzone.putTextRect(frame, f"{classNames[label]} {conf}", (max(
    #                 0, x1), max(35, y1-10)), 2, 1, (0, 255, 0), 2)

    # # Encode the frame as JPEG
    # _, buffer = cv2.imencode('.jpg', frame)
    # frame_bytes = buffer.tobytes()

    # return Response(frame_bytes, mimetype='image/jpeg')


if __name__ == '__main__':
    app.run(debug=True)
