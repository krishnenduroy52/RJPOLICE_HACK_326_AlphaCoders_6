from flask import Flask, request
from flask_cors import CORS
from gun_detection import gun_find
from licence_plate import license_plate_find

import numpy as np
import cv2
import base64
from io import BytesIO

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


if __name__ == '__main__':
    app.run(debug=True)


