from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io

# Load YOLO model (ensure path is correct)
model = YOLO('')

# Class names
class_names = ["tree"]

def predict(image_bytes):
    # Convert bytes to PIL Image
    image = Image.open(io.BytesIO(image_bytes))
    image_np = np.array(image)

    # Run YOLO prediction
    results = model(image_np)
    return results, image_np

def draw_boxes(image, results):
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy().astype(int)
        classes = result.boxes.cls.cpu().numpy().astype(int)

        for box, cls in zip(boxes, classes):
            x1, y1, x2, y2 = box
            label = class_names[cls]
            color = (0, 255, 0)  # Green bounding box

            cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)
            cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

    return image

def get_tree_detection(image_bytes):
    results, original_image = predict(image_bytes)
    annotated_image = draw_boxes(original_image.copy(), results)

    # Convert annotated image to bytes
    _, buffer = cv2.imencode('.jpg', annotated_image)
    annotated_image_bytes = buffer.tobytes()

    # Prepare prediction details
    prediction_details = []
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy().astype(int)
        classes = result.boxes.cls.cpu().numpy().astype(int)
        confidences = result.boxes.conf.cpu().numpy()

        for box, cls, conf in zip(boxes, classes, confidences):
            x1, y1, x2, y2 = box
            label = class_names[cls]
            prediction_details.append({
                "class": label,
                "confidence": float(conf),
                "bounding_box": [x1, y1, x2, y2]
            })

    return prediction_details, annotated_image_bytes