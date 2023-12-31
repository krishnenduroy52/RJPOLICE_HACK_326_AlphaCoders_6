import firebase_admin
from firebase_admin import credentials, storage

print("hello world")

cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(
    cred, {'storageBucket': 'yolo-detected-img-store.appspot.com'})

fileName = "logo512.png"
bucket = storage.bucket()
blob = bucket.blob(fileName)
blob.upload_from_filename(fileName)

blob.make_public()
print("your file url", blob.public_url)
