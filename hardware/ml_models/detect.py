import torch
import numpy as np
from ultralytics import YOLO
import cv2

# Load the YOLO model
def load_model(model_path):
    return YOLO(model_path)

# Define class names
class_names = []

def set_class(cls = "tree"):
    class_names = cls

def predict(model, image):
    """Run the model prediction on the given image."""
    cv_image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    results = model(cv_image)
    return results

def draw_boxes(image, results):
    """Draw bounding boxes on the image based on the model's results."""
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy().astype(int)
        classes = result.boxes.cls.cpu().numpy().astype(int)
        
        for box, cls in zip(boxes, classes):
            x1, y1, x2, y2 = box
            label = class_names[cls]
            color = (0, 255, 0)  # Green color for bounding box
            cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)
            cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
    
    return image
