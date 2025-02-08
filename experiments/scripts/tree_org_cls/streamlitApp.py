import streamlit as st
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import tempfile
import os

# Load the YOLO model
@st.cache_resource
def load_model():
    return YOLO('/home/rogue/Desktop/OrchardEyes/experiments/models/tree-organ-best-model.pt')

model = load_model()

# Define class names
class_names = ["branch", "flower", "leaf-cluster", "fruit"]

def predict(image):
    results = model(image)
    return results

def draw_boxes(image, results):
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

st.title("Tree Organ Classification App")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Read the image
    image = Image.open(uploaded_file)
    
    # Convert PIL Image to numpy array
    image_np = np.array(image)
    
    # Make prediction
    results = predict(image_np)
    
    # Draw bounding boxes
    image_with_boxes = draw_boxes(image_np.copy(), results)
    
    # Display the result
    st.image(image_with_boxes, caption='Detected Objects', use_column_width=True)
    
    # Display prediction details
    st.subheader("Prediction Details:")
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy().astype(int)
        classes = result.boxes.cls.cpu().numpy().astype(int)
        confidences = result.boxes.conf.cpu().numpy()
        
        for box, cls, conf in zip(boxes, classes, confidences):
            x1, y1, x2, y2 = box
            label = class_names[cls]
            st.write(f"Class: {label}, Confidence: {conf:.2f}, Bounding Box: ({x1}, {y1}, {x2}, {y2})")

st.sidebar.title("About")
st.sidebar.info("This app uses a YOLO model to detect objects in apple orchard images. Upload an image to see the detection results.")