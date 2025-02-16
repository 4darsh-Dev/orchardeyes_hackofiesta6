

from flask import Flask, request, jsonify, send_file
from auth import generate_token, token_required
from utils.utils import log_request_info, allowed_file
import numpy as np
import io
import base64
from models.image_processing.ocr_tesseract import SoilHealthOCR
from models.image_processing.yolo_detection.plant_part_detect import get_predictions_with_annotations
from models.image_processing.yolo_detection.tree_detect import get_tree_detection

app = Flask(__name__)

# Health Check
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'API is running'}), 200

# Login Endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'admin' and password == 'admin':  # Dummy auth
        token = generate_token(user_id=username)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

def convert_predictions(predictions):
    return [
        {
            "label": pred["class"],
            "confidence": float(pred["confidence"]),
            "bounding_box": [int(coord) for coord in pred["bounding_box"]]
        }
        for pred in predictions
    ]

def encode_image_to_base64(image_bytes):
    return base64.b64encode(image_bytes).decode('utf-8')

@app.route('/tree-part-cls', methods=['POST'])
@token_required
def predict_tree_parts(current_user):
    log_request_info(request)

    if 'image' not in request.files:
        return jsonify({'message': 'No image provided'}), 400

    file = request.files['image']

    if file and allowed_file(file.filename):
        image_bytes = file.read()
        predictions, annotated_image_bytes = get_predictions_with_annotations(image_bytes)

        # Convert predictions and encode image
        clean_predictions = convert_predictions(predictions)
        encoded_image = encode_image_to_base64(annotated_image_bytes)

        return jsonify({
            'user': current_user,
            'predictions': clean_predictions,
            'annotated_image': encoded_image
        }), 200
    else:
        return jsonify({'message': 'Invalid file format'}), 400

@app.route('/tree-detection', methods=['POST'])
@token_required
def detect_trees(current_user):
    log_request_info(request)

    if 'image' not in request.files:
        return jsonify({'message': 'No image provided'}), 400

    file = request.files['image']

    if file and allowed_file(file.filename):
        image_bytes = file.read()
        predictions, annotated_image_bytes = get_tree_detection(image_bytes)

        # Convert predictions and encode image
        clean_predictions = convert_predictions(predictions)
        encoded_image = encode_image_to_base64(annotated_image_bytes)

        return jsonify({
            'user': current_user,
            'predictions': clean_predictions,
            'annotated_image': encoded_image
        }), 200
    else:
        return jsonify({'message': 'Invalid file format'}), 400

@app.route('/process-soil-report', methods=['POST'])
@token_required
def process_soil_report(current_user):
    log_request_info(request)

    if 'image' not in request.files:
        return jsonify({'message': 'No image provided'}), 400

    file = request.files['image']

    if file and allowed_file(file.filename):
        image_path = f"/tmp/{file.filename}"
        file.save(image_path)

        json_data = SoilHealthOCR.process_image(image_path)

        return jsonify({
            'user': current_user,
            'soil_health_data': json_data
        }), 200
    else:
        return jsonify({'message': 'Invalid file format'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)