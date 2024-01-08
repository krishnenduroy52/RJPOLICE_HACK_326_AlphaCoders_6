# import os
# import cv2
# import math
# from ultralytics import YOLO
# import cvzone
# import uuid
# import time

# from util import send_notification
# from util import store_image

# api_url = "http://localhost:8000/sendnotification/fire"
# # Introduce a variable to store the time of the last notification
# last_notification_time = 0

# # Initialize count
# count = 0

# # Model With classes
# model = YOLO("./Detection/model/fire.pt")
# classNames = ["Fire", "default", "smoke"]

# # Introduce a variable to store the time of the last notification
# last_notification_time = 0


# def fire_detection(request):
#     global count
#     if 'image' in request.files:
#         try:
#             image = request.files['image']
#             img = cv2.imread(image)
#             results = model(img, stream=True)
#             download_link = None
#             fire_detected = False

#             for r in results:
#                 boxes = r.boxes
#                 for box in boxes:
#                     x1, y1, x2, y2 = box.xyxy[0]
#                     x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
#                     cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
#                     conf = math.ceil((box.conf[0] * 100)) / 100
#                     label = int(box.cls[0])
#                     print(classNames[label], conf)
#                     if (classNames[label] == 'Fire') and conf > 0.2:
#                         fire_detected = True
#                         cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
#                             0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)

#                         filename = f"fire-detection-{uuid.uuid4()}.jpg"
#                         download_link = store_image(img, filename)
#                         send_notification("fire")

#             if fire_detected:
#                 return {'status': 'success', 'message': 'Fire detected', 'download_link': download_link}
#             return {'status': 'success', 'message': 'No fire detected'}

#         except Exception as e:
#             return {'status': 'error', 'message': f"Error: {e}"}
import os
import cv2
import math
from ultralytics import YOLO
import cvzone
import uuid
import time

from util import send_notification
from util import store_image

api_url = "http://localhost:8000/sendnotification/fire"
# Introduce a variable to store the time of the last notification
last_notification_time = 0

# Model With classes
model = YOLO("./Detection/model/fire.pt")
classNames = ["Fire", "default", "smoke"]



def fire_detection(request):
    global last_notification_time
    if 'image' in request.files:
        try:
            image = request.files['image']
            img = cv2.imread(image)
            results = model(img, stream=True)
            download_link = None
            fire_detected = False

            for r in results:
                boxes = r.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                    conf = math.ceil((box.conf[0] * 100)) / 100
                    label = int(box.cls[0])
                    print(classNames[label], conf)
                    if (classNames[label] == 'Fire') and conf > 0.2:
                        fire_detected = True
                        cvzone.putTextRect(img, f"{classNames[label]} {conf}", (max(
                            0, x1), max(35, y1 - 10)), 2, 1, (0, 255, 0), 2)

                        # Check if 20 seconds have elapsed since the last notification
                        current_time = time.time()
                        if current_time - last_notification_time >= 6:
                            filename = f"fire-detection-{uuid.uuid4()}.jpg"
                            download_link = store_image(img, filename)
                            send_notification("Fire")
                            last_notification_time = current_time

            if fire_detected:
                return {'status': 'success', 'message': 'Fire detected', 'download_link': download_link}
            return {'status': 'success', 'message': 'No fire detected'}

        except Exception as e:
            return {'status': 'error', 'message': f"Error: {e}"}
