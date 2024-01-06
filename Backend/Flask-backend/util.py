import time
import requests


def send_notification(type):
    api_url = f"http://localhost:8000/sendnotification/{type}"
    try:
        requests.get(api_url)
    except Exception as e:
        print(e)
        return {"message": "Backend Error", "status": "failed"}
