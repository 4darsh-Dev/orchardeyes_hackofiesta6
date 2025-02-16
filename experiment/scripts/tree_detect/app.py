import gradio as gr
from ultralytics import YOLO
import os
from PIL import Image
import cv2
import numpy as np
import uuid

class TreeDetectionModel:
    def __init__(self, model_path):
        """
        Initialize the YOLOv8 model for tree detection.
        Args:
            model_path (str): Path to the trained YOLOv8 model (.pt or .onnx).
        """
        self.model = YOLO(model_path)

    def detect(self, image_path):
        """
        Perform inference on an image.
        Args:
            image_path (str): Path to the input image.
        Returns:
            dict: Detection results including bounding boxes, class labels, and confidence scores.
        """
        results = self.model(image_path)
        detections = []

        for result in results:
            for box in result.boxes:
                detections.append({
                    'class': result.names[int(box.cls)],
                    'confidence': float(box.conf),
                    'bbox': box.xyxy.tolist()[0]
                })

        return detections
    
    def extract_geotag(self, image_path):
        """
        Extract GPS coordinates from the image's EXIF data.
        Args:
            image_path (str): Path to the input image.
        Returns:
            dict: Geotag information (latitude, longitude, altitude).
        """
        img = Image.open(image_path)
        exif_data = img._getexif()
        if exif_data:
            gps_info = exif_data.get(34853, {})
            return {
                'lat': gps_info.get(2),
                'lon': gps_info.get(4),
                'alt': gps_info.get(6)
            }
        return None


# Load the trained YOLOv8 model
model_path = "/home/kalie/work/projects/Community-Tree/ai/yolov8_model/best.pt"
tree_detector = TreeDetectionModel(model_path)

def detect_trees(image):
    """
    Perform tree detection on the uploaded image and display results.
    Args:
        image (PIL.Image): Input image.
    Returns:
        tuple: (annotated_image, detections_table, geotag_info)
    """
    # Convert PIL image to OpenCV format
    image_cv = np.array(image)
    image_cv = cv2.cvtColor(image_cv, cv2.COLOR_RGB2BGR)

    # Save the image temporarily
    temp_image_path = "temp_image.jpg"
    cv2.imwrite(temp_image_path, image_cv)

    # Perform detection
    detections = tree_detector.detect(temp_image_path)

    # Draw bounding boxes on the image
    for detection in detections:
        x1, y1, x2, y2 = map(int, detection['bbox'])
        cv2.rectangle(image_cv, (x1, y1), (x2, y2), (0, 255, 0), 2)
        label = f"{detection['class']} ({detection['confidence']:.2f})"
        cv2.putText(image_cv, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # Convert back to PIL format for Gradio
    annotated_image = Image.fromarray(cv2.cvtColor(image_cv, cv2.COLOR_BGR2RGB))

    # Prepare detections table
    detections_table = [
        [detection['class'], detection['confidence'], detection['bbox']]
        for detection in detections
    ]

    # Extract geotag
    geotag = tree_detector.extract_geotag(temp_image_path)
    geotag_info = f"Latitude: {geotag['lat']}\nLongitude: {geotag['lon']}\nAltitude: {geotag['alt']}" if geotag else "No geotag found."

    return annotated_image, detections_table, geotag_info

# Gradio Interface
with gr.Blocks() as demo:
    gr.Markdown("# 🌳 Tree Detection App")
    gr.Markdown("Upload an image to detect trees and view results.")

    with gr.Row():
        with gr.Column():
            image_input = gr.Image(label="Upload Image", type="pil")
            submit_button = gr.Button("Detect Trees")
        with gr.Column():
            image_output = gr.Image(label="Annotated Image")
            detections_output = gr.Dataframe(
                headers=["Class", "Confidence", "Bounding Box"],
                label="Detection Results"
            )
            geotag_output = gr.Textbox(label="Geotag Information")

    submit_button.click(
        detect_trees,
        inputs=image_input,
        outputs=[image_output, detections_output, geotag_output]
    )

# Run the app
demo.launch()