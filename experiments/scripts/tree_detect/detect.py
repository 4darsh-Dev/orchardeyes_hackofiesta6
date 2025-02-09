from ultralytics import YOLO
import cv2
import numpy as np
import argparse

def detect_objects(image_path, model_path, conf_threshold=0.25):
    # Load the model
    model = YOLO(model_path)

    # Perform inference
    results = model(image_path, conf=conf_threshold)

    # Process results
    img = cv2.imread(image_path)
    for result in results:
        boxes = result.boxes.cpu().numpy()
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0].astype(int)
            cls = int(box.cls[0])
            conf = box.conf[0]
            
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(img, f'{model.names[cls]} {conf:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # Save the annotated image
    output_path = image_path.replace('.jpg', '_detected.jpg')
    cv2.imwrite(output_path, img)
    print(f"Annotated image saved as {output_path}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Detect apple tree parts in an image.')
    parser.add_argument('image_path', type=str, help='Path to the input image')
    parser.add_argument('model_path', type=str, help='Path to the trained model')
    parser.add_argument('--conf', type=float, default=0.25, help='Confidence threshold')
    args = parser.parse_args()

    detect_objects(args.image_path, args.model_path, args.conf)