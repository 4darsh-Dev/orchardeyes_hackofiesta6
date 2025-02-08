from flask import Flask, request, jsonify
from PIL import Image
import io
import time
import numpy as np
from detect import load_model, predict

# Initialize the Flask app
app = Flask(__name__)

# Load the tree detection model
model = load_model('/home/rogue/Desktop/orch_tree/models/tree_detection_best_v2.pt')  # Specify the correct path to your model file
model2 = load_model('/home/rogue/Desktop/orch_tree/models/tree-organ-best-model.pt')

@app.route('/health_check', methods=['GET'])
def health_check():
    """Simple endpoint to check the health of the API"""
    return jsonify({"status": "Healthy", "message": "API is running"}), 200

@app.route('/predict', methods=['POST'])
def predict_endpoint():
    """Endpoint to handle image predictions"""
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    # Load image from request
    image_file = request.files['image']
    try:
        image_bytes = image_file.read()

        # Convert the image bytes to a numpy array
        image_np = np.frombuffer(image_bytes, np.uint8)
        # Decode the image from the numpy array
        
    
    except Exception as e:
        return jsonify({"error": f"Invalid image format: {str(e)}"}), 400

    # Run the model prediction
    start_time = time.time()
    print("working here. end1 ")
    results = predict(model, image_np)  # Use the predict function from detect.py
    end_time = time.time()

    # Process results for JSON response
    response_data = []
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy().astype(int)
        classes = result.boxes.cls.cpu().numpy().astype(int)
        confidences = result.boxes.conf.cpu().numpy()

        for box, cls, conf in zip(boxes, classes, confidences):
            x1, y1, x2, y2 = box
            response_data.append({
                "class": "tree",  # Assuming single class 'tree'
                "confidence": float(conf),
                "bounding_box": [int(x1), int(y1), int(x2), int(y2)]
            })

    # Measure response time
    response_time = round(end_time - start_time, 3)

    # Return the prediction result
    return jsonify({
        "results": response_data,
        "response_time": f"{response_time} seconds"
    }), 200

@app.route('/predict/yolo2', methods=['POST'])
def predict_endpoint_2():
    """Endpoint to handle image predictions"""
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    # Load image from request
    image_file = request.files['image']
    try:
        image_bytes = image_file.read()

        # Convert the image bytes to a numpy array
        image_np = np.frombuffer(image_bytes, np.uint8)
        # Decode the image from the numpy array
        
    
    except Exception as e:
        return jsonify({"error": f"Invalid image format: {str(e)}"}), 400

    # Run the model prediction
    start_time = time.time()
    results = predict(model2, image_np)  # Use the predict function from detect.py
    end_time = time.time()

    # Process results for JSON response
    response_data = []
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy().astype(int)
        classes = result.boxes.cls.cpu().numpy().astype(int)
        confidences = result.boxes.conf.cpu().numpy()

        for box, cls, conf in zip(boxes, classes, confidences):
            x1, y1, x2, y2 = box
            response_data.append({
                "class": "tree",  # Assuming single class 'tree'
                "confidence": float(conf),
                "bounding_box": [int(x1), int(y1), int(x2), int(y2)]
            })

    # Measure response time
    response_time = round(end_time - start_time, 3)

    # Return the prediction result
    return jsonify({
        "results": response_data,
        "response_time": f"{response_time} seconds"
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
