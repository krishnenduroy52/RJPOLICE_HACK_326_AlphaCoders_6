import cv2
import numpy as np
from util import send_notification


def camera_displacement(request):
    try:
        if 'image' in request.files:
            img = request.files['image']
            # Convert image data to NumPy array
            nparr = np.frombuffer(img.read(), np.uint8)
            img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            gray = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
            canny_img = cv2.Canny(gray, 50, 150)
            mask = cv2.adaptiveThreshold(
                gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 3, 3)
            and_mask = cv2.bitwise_and(mask, canny_img)

            nonzero_area = cv2.countNonZero(and_mask)

            if (nonzero_area < 1000):
                print("camera blocked")
                send_notification("camera-BLOCKED")
                return {"camerablocked": "True", "message": "camera blocked", "status": "success"}
            else:
                print("camera not blocked")
                return {"camerablocked": "False", "message": "camera blocked", "status": "success"}

    except Exception as e:
        print(e)
        return {"message": "Backend Error", "status": "failed"}
