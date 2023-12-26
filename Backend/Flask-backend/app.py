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

if __name__ == '__main__':
    app.run(debug=True)
