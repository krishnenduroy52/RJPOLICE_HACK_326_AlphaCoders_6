import os
import cv2
from firebase_admin import credentials, storage

cred = credentials.Certificate("serviceAccount.json")
bucket = storage.bucket()

def initialize_firebase():
    return credentials.Certificate("serviceAccount.json")

def upload_to_firebase(img):
    global count
    count += 1
    filename = f"detected-{count}.jpg"
    cv2.imwrite(filename, img)

    blob = bucket.blob(filename)
    blob.upload_from_filename(filename)
    blob.make_public()
    download_link = blob.public_url

    os.remove(filename)

    return download_link
