# detect.py
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50
from PIL import Image
import torch.nn as nn

# Define the class names - make sure these match your training classes
CLASS_NAMES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    # Add all your class names here...
]

def load_model(model_path):
    # Initialize the model architecture
    model = resnet50(pretrained=False)
    num_classes = len(CLASS_NAMES)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    
    # Load the state dict
    state_dict = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(state_dict)
    model.eval()
    return model

def predict_image(image_path, model):
    """Predict the class of a given image"""
    # Define the same transform as used during training
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    
    # Load and preprocess the image
    image = Image.open(image_path).convert('RGB')
    image_tensor = transform(image).unsqueeze(0)
    
    # Make prediction
    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
        
    return CLASS_NAMES[predicted.item()]

# streamlit_app.py
import streamlit as st
import torch
import torchvision.transforms as transforms
from PIL import Image
import os
from detect import load_model, predict_image, CLASS_NAMES

# Set page config
st.set_page_config(page_title="Plant Disease Predictor", page_icon="🍃", layout="wide")

# Load the model
@st.cache_resource
def load_model_cached():
    model_path = '/home/kalie/work/projects/OrchardEyes/experiments/models/leaf_disease_res50_model_epoch_10.pth'
    model = load_model(model_path)
    return model

# Load model at startup
model = load_model_cached()

# Streamlit app
st.title("Plant Disease Predictor")
st.write("Upload an image of a plant leaf to predict if it has a disease.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert('RGB')
    st.image(image, caption='Uploaded Image', use_column_width=True)
    
    if st.button('Predict'):
        # Show prediction in progress
        with st.spinner('Analyzing image...'):
            # Save the uploaded file temporarily
            with open("temp_image.jpg", "wb") as f:
                f.write(uploaded_file.getbuffer())
            
            # Make prediction
            prediction = predict_image("temp_image.jpg", model)
            
            # Remove temporary file
            os.remove("temp_image.jpg")
            
            # Display result
            st.success(f"Prediction: {prediction}")
            
            # Display confidence scores
            transform = transforms.Compose([
                transforms.Resize((224, 224)),  # Match the training size
                transforms.ToTensor(),
            ])
            
            with torch.no_grad():
                img_tensor = transform(image).unsqueeze(0)
                outputs = model(img_tensor)
                probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            
            # Display top 5 predictions
            top5_prob, top5_catid = torch.topk(probabilities, 5)
            st.write("Top 5 Predictions:")
            for i in range(top5_prob.size(0)):
                st.write(f"{CLASS_NAMES[top5_catid[i]]}: {top5_prob[i].item()*100:.2f}%")

# Display list of detectable diseases
st.write("## List of Detectable Plant Diseases")
st.write("This model can detect the following plant diseases:")
for disease in CLASS_NAMES:
    st.write(f"- {disease.replace('___', ' - ')}")