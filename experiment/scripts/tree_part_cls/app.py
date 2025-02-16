
import gradio as gr
import numpy as np
import cv2
from PIL import Image
import io
from ultralytics import YOLO

# Load YOLO model
model = YOLO('/home/kalie/work/projects/OrchardEyes/experiments/models/tree-organ-best-model.pt')

# Class names
class_names = ["branch", "flower", "leaf-cluster", "fruit"]

def predict(image):
    # Convert PIL image to numpy array
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

def process_image(image):
    results, original_image = predict(image)
    annotated_image = draw_boxes(original_image.copy(), results)
    
    # Convert numpy image to PIL image
    annotated_pil = Image.fromarray(annotated_image)
    
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
                "Class": label,
                "Confidence": round(float(conf), 2),
                "Bounding Box": [x1, y1, x2, y2]
            })
    
    return annotated_pil, prediction_details

# Gradio interface
demo = gr.Interface(
    fn=process_image,
    inputs=gr.Image(type="pil"),
    outputs=[gr.Image(type="pil"), gr.JSON()],
    title="YOLOv8 Plant Part Detection",
    description="Upload an image, and the model will detect and classify plant parts with bounding boxes."
)

demo.launch()
