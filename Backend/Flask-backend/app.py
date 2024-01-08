from flask import Flask, request
from flask_cors import CORS
import numpy as np
from Detection.gun_detection import gun_find
from Detection.licence_plate import license_plate_find
from Detection.camera_displacement import camera_displacement
from Detection.fire_detection import fire_detection
from Detection.criminal_detection import criminal_detection
import firebase_admin
from firebase_admin import credentials, storage

import cv2
cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(
    cred, {'storageBucket': 'yolo-detected-img-store.appspot.com'})

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def hello():
    return "Hello hackathon"


@app.route('/gun-detection', methods=['POST'])
def handle_gun_detection():
    return gun_find(request)


@app.route('/license-plate-detection', methods=['POST'])
def handle_license_plate_detection():
    return license_plate_find(request)


@app.route('/camera-displacement', methods=['POST'])
def handle_camera_displacement():
    return camera_displacement(request)


@app.route('/fire-detection', methods=['POST'])
def handle_fire_detection():
    return fire_detection(request)


@app.route('/criminal-detection', methods=['POST'])
def handle_criminal_detection():
    return criminal_detection(request)


if __name__ == '__main__':
    app.run(debug=True)
