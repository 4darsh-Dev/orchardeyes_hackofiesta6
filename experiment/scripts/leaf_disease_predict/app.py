

import gradio as gr
import torch
import torchvision.transforms as transforms
from PIL import Image
import os

# Import your model and related functions
from leaf_disease_predict import ResNet9, load_model, predict_image, CLASS_NAMES

# Load the model
def load_model_cached():
    model_path = '/home/kalie/work/projects/Apple-Orchard/experiments/models/plant-disease-model-complete.pth'
    model = load_model(model_path)
    return model

model = load_model_cached()

# Function to make predictions
def predict(image):
    # Save the uploaded file temporarily
    temp_image_path = "temp_image.jpg"
    image.save(temp_image_path)
    
    # Make prediction
    prediction = predict_image(temp_image_path, model)
    
    # Remove temporary file
    os.remove(temp_image_path)
    
    # Get confidence scores
    with torch.no_grad():
        transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
        ])
        img_tensor = transform(image).unsqueeze(0)
        outputs = model(img_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
    
    # Get top 5 predictions
    top5_prob, top5_catid = torch.topk(probabilities, 5)
    top_predictions = {CLASS_NAMES[top5_catid[i]]: float(top5_prob[i].item() * 100) for i in range(top5_prob.size(0))}
    
    return prediction, top_predictions

# Gradio app
def gradio_app():
    # Define the interface
    with gr.Blocks(theme=gr.themes.Soft()) as demo:
        gr.Markdown("# 🍃 Plant Disease Predictor")
        gr.Markdown("Upload an image of a plant leaf to predict if it has a disease.")
        
        with gr.Row():
            with gr.Column():
                image_input = gr.Image(label="Upload Image", type="pil")
                predict_button = gr.Button("Predict")
            with gr.Column():
                prediction_output = gr.Textbox(label="Prediction Result")
                top_predictions_output = gr.Label(label="Top 5 Predictions")
        
        # Add a section for detectable diseases
        with gr.Accordion("List of Detectable Plant Diseases"):
            gr.Markdown("This model can detect the following plant diseases:")
            for disease in CLASS_NAMES:
                gr.Markdown(f"- {disease.replace('___', ' - ')}")
        
        # Set up the prediction function
        predict_button.click(
            fn=predict,
            inputs=image_input,
            outputs=[prediction_output, top_predictions_output]
        )
    
    return demo

# Launch the app
if __name__ == "__main__":
    app = gradio_app()
    app.launch()