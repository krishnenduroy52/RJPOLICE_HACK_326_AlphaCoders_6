from deepface import DeepFace
import cv2

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def criminal_detection(request):
    # get two image imageref and image from request 
    image = request.files['image'].read()
    image = cv2.imdecode(np.frombuffer(image, np.uint8), -1)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    imageref = request.files['imageref'].read()
    imageref = cv2.imdecode(np.frombuffer(imageref, np.uint8), -1)
    imageref = cv2.cvtColor(imageref, cv2.COLOR_BGR2RGB)
    # detect face in image
    
