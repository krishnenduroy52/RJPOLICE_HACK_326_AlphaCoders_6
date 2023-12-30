from flask import Flask, request
from flask_cors import CORS
import cv2


app = Flask(__name__)
cors = CORS(app)

global count
count = 0


@app.route('/upload', methods=['POST'])
def upload():
    if 'image' in request.files:
        image = request.files['image']

        # Process the image as needed (e.g., save it to disk, perform image processing, etc.)

        # Save the image to the current directory
        global count
        count += 1
        image.save(f'test{count}.jpg')

        return {'status': 'success'}
    else:
        return {'status': 'failure', 'message': 'No image provided'}


if __name__ == '__main__':
    app.run(debug=True)
