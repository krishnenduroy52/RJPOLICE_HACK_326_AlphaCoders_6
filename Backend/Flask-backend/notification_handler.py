import requests
import time

api_url = "http://localhost:8000/sendnotification"

def send_notification():
    global last_notification_time
    current_time = time.time()

    try:
        if current_time - last_notification_time > 60:
            print("Notification sent successfully")
            response = requests.get(api_url)
            last_notification_time = current_time
    except Exception as e:
        print(f"Error sending notification: {e}")
