import time
import requests
import firebase_admin
import os
import cv2
from firebase_admin import credentials, storage


def send_notification(type):
    api_url = f"http://localhost:8000/sendnotification/{type}"
    try:
        requests.get(api_url)
    except Exception as e:
        print(e)
        return {"message": "Backend Error", "status": "failed"}


def store_image(img, filename):
    try:
        cv2.imwrite(filename, img)
        bucket = storage.bucket()
        blob = bucket.blob(filename)
        blob.upload_from_filename(filename)
        blob.make_public()
        download_link = blob.public_url
        os.remove(filename)
        return download_link
    except Exception as e:
        return "https://i.imgur.com/6KUt4Ys.jpg"
